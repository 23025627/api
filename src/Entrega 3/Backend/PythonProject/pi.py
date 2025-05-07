import pandas as pd
import sqlite3
import requests
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from datetime import datetime
import unicodedata
import warnings

warnings.filterwarnings("ignore")

# Configs globais
SEED = 20
GOOGLE_API_KEY = "AIzaSyDLZuBuKwtf5kIBRrC7e_Yf3Qaf8RuWi10"


def load_data():
    conn = sqlite3.connect("base_corridas")
    df = pd.read_sql_query("SELECT * FROM Corridas", conn)
    conn.close()
    return df


def strtotime(time_str):
    time_obj = datetime.strptime(time_str, "%H:%M:%S.%f").time()
    return time_obj


def preprocess(df):
    # Reduz 50% da base
    df = df.sample(frac=0.5, random_state=SEED).reset_index(drop=True)

    X = df[["OrigDest_x", "Lat1", "Lng1", "OrigDest_y", "Lat2", "Lng2", "Distancia", "Dia", "schedule_time"]]
    y = df["Price"]

    treino_x, teste_x, treino_y, teste_y = train_test_split(X, y, test_size=0.3, random_state=SEED)

    for col in ["Lat1", "Lng1", "Lat2", "Lng2"]:
        treino_x[col] = treino_x[col].astype(str).str.replace(',', '.').astype(float)
        teste_x[col] = teste_x[col].astype(str).str.replace(',', '.').astype(float)

    for df_x in [treino_x, teste_x]:
        df_x['schedule_time'] = df_x['schedule_time'].apply(
            lambda x: strtotime(x).hour * 3600 + strtotime(x).minute * 60 + strtotime(x).second
        )

    treino_x, teste_x = treino_x.align(teste_x, join='left', axis=1, fill_value=0)

    return treino_x, teste_x, treino_y, teste_y


def treinar_modelo(treino_x, treino_y, modelo):
    modelo.fit(treino_x, treino_y)
    return modelo


def avaliar_modelo(modelo, teste_x, teste_y):
    pred_y = modelo.predict(teste_x)
    r2 = r2_score(teste_y, pred_y)
    mse = mean_squared_error(teste_y, pred_y)
    mae = mean_absolute_error(teste_y, pred_y)

    print(f"R2 (Acuracia): {r2 * 100:.2f}%")
    print(f"MSE : {mse:.2f}")
    print(f"MAE : {mae:.2f}")

    return pred_y


def limpar_endereco(endereco):
    nfkd = unicodedata.normalize('NFKD', endereco)
    return u"".join([c for c in nfkd if not unicodedata.combining(c)])


def endereco_para_coordenadas(endereco):
    endereco_limpo = limpar_endereco(endereco)
    url = f"https://maps.googleapis.com/maps/api/geocode/json?address={endereco_limpo}&key={GOOGLE_API_KEY}"
    response = requests.get(url)
    data = response.json()

    if data['status'] == 'OK':
        location = data['results'][0]['geometry']['location']
        return location['lat'], location['lng']
    else:
        raise ValueError(f"Erro ao geocodificar com Google: {data['status']}")


def calcular_distancia_google(origem, destino):
    lat1, lng1 = endereco_para_coordenadas(origem)
    lat2, lng2 = endereco_para_coordenadas(destino)

    url = (
        f"https://maps.googleapis.com/maps/api/distancematrix/json?"
        f"origins={lat1},{lng1}&destinations={lat2},{lng2}&key={GOOGLE_API_KEY}"
    )
    response = requests.get(url)
    data = response.json()

    if data['status'] == 'OK':
        elemento = data['rows'][0]['elements'][0]
        if elemento['status'] == 'OK':
            distancia_km = elemento['distance']['value'] / 1000  # metros para km
            tempo_min = elemento['duration']['value'] / 60  # segundos para minutos
            return distancia_km, tempo_min
        else:
            raise ValueError(f"Erro na Distance Matrix: {elemento['status']}")
    else:
        raise ValueError(f"Erro na API Distance Matrix: {data['status']}")


def gerar_features(end_origem, end_destino, horario=None):
    lat1, lng1 = endereco_para_coordenadas(end_origem)
    lat2, lng2 = endereco_para_coordenadas(end_destino)
    distancia, tempo = calcular_distancia_google(end_origem, end_destino)

    now = horario or datetime.now()
    schedule_time = now.hour * 3600 + now.minute * 60 + now.second
    dia = now.weekday()

    orig_dest_x = abs(hash(end_origem)) % (10 ** 8)
    orig_dest_y = abs(hash(end_destino)) % (10 ** 8)

    df = pd.DataFrame([{
        "OrigDest_x": orig_dest_x,
        "Lat1": lat1,
        "Lng1": lng1,
        "OrigDest_y": orig_dest_y,
        "Lat2": lat2,
        "Lng2": lng2,
        "Distancia": distancia,
        "Tempo": tempo,
        "Dia": dia,
        "schedule_time": schedule_time
    }])

    return df


def prever_preco(modelo, end_origem, end_destino):
    dados = gerar_features(end_origem, end_destino)
    dados_para_prever = dados.drop(columns=["Tempo"])
    preco_estimado = modelo.predict(dados_para_prever)[0]

    dados["Preco_Previsto"] = preco_estimado
    dados["Endereco_Origem"] = end_origem
    dados["Endereco_Destino"] = end_destino
    return dados


if __name__ == "__main__":
    df = load_data()
    treino_x, teste_x, treino_y, teste_y = preprocess(df)

    print("\nTreinando modelo RandomForest...")
    rf_model = treinar_modelo(treino_x, treino_y, RandomForestRegressor(n_estimators=100, random_state=SEED))
    avaliar_modelo(rf_model, teste_x, teste_y)

    print("\nTreinando modelo GradientBoosting...")
    gb_model = treinar_modelo(treino_x, treino_y, GradientBoostingRegressor(random_state=SEED))
    avaliar_modelo(gb_model, teste_x, teste_y)

    print("\n=== Previsão de Preço Uber ===")
    origem = input("Digite o endereço de ORIGEM: ").strip()
    destino = input("Digite o endereço de DESTINO: ").strip()

    try:
        resultado = prever_preco(gb_model, origem, destino)
        preco = resultado["Preco_Previsto"].values[0]
        distancia = resultado["Distancia"].values[0]
        tempo = resultado["Tempo"].values[0]

        preco_confort = preco * 1.25
        preco_black = preco_confort * 1.24

        print(f"\n🚗 Preço estimado da corrida (Ubex): R$ {preco:.2f}")
        print(f"\n🚗 Preço estimado (Uber Confort): R$ {preco_confort:.2f}")
        print(f"\n🚘 Preço estimado (Uber Black): R$ {preco_black:.2f}")
        print(f"\n📍 Distância estimada: {distancia:.2f} km")
        print(f"⏱️ Tempo estimado: {tempo:.0f} minutos")

    except Exception as e:
        print(f"\n❌ Erro ao calcular o preço: {e}")
