from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.metrics import mean_squared_error
from sklearn.metrics import r2_score
from datetime import datetime
import pandas as pd

conn = sqlite3.connect("base_corridas")
cursor = conn.cursor()

dfJoinAdd3 = pd.read_sql_query("SELECT * FROM Corridas", conn)
dfJoinAdd3.head(2)

def strtotime(time_str):
    time_obj = datetime.strptime(time_str, "%H:%M:%S.%f").time()
    return time_obj

dfJoinAdd3 = pd.read_sql_query("SELECT * FROM Corridas", conn)

dfJoinAdd3 = dfJoinAdd3.sample(frac=0.5) #reduz em 50% da base para teste

X = dfJoinAdd3[["OrigDest_x","Lat1","Lng1","OrigDest_y","Lat2","Lng2","Distancia","Dia","schedule_time"]]
y = dfJoinAdd3["Price"]

SEED = 20

treino_x, teste_x, treino_y, teste_y = train_test_split(X, y, test_size=0.3, random_state=SEED) # Linha adicionada
#coluna limpa:

# Convertendo colunas de latitude e longitude para o formato correto
for col in ["Lat1", "Lng1", "Lat2", "Lng2"]:
    treino_x[col] = treino_x[col].astype(str).str.replace(',', '.').astype(float)
    teste_x[col] = teste_x[col].astype(str).str.replace(',', '.').astype(float)

# Convertendo 'schedule_time' para segundos desde a meia-noite
treino_x['schedule_time'] = treino_x['schedule_time'].apply(lambda x: strtotime(x).hour * 3600 + strtotime(x).minute * 60 + strtotime(x).second)
teste_x['schedule_time'] = teste_x['schedule_time'].apply(lambda x: strtotime(x).hour * 3600 + strtotime(x).minute * 60 + strtotime(x).second)

#treino_x = pd.get_dummies(treino_x, columns=['ProductID'], prefix=['ProductID'])
#teste_x = pd.get_dummies(teste_x, columns=['ProductID'], prefix=['ProductID'])

# Alinhar as colunas após o get_dummies
treino_x, teste_x = treino_x.align(teste_x, join='left', axis=1, fill_value=0)

# Agora você pode treinar o modelo:
model = RandomForestRegressor(n_estimators=100, random_state=SEED)
model.fit(treino_x , treino_y)

predicao_y = model.predict(teste_x)
r2 = r2_score(teste_y, predicao_y)
mse = mean_squared_error(teste_y, predicao_y)
mae = mean_absolute_error(teste_y, predicao_y)

print(f"Erro médio absoluto: {mae}")
print(f"Erro quadrático médio: {mse}")


#escolha de IA

from sklearn.ensemble import GradientBoostingRegressor

# 2 - Definindo o modelo:
modelo = GradientBoostingRegressor()
modelo.fit(treino_x, treino_y)

#entregando acuracia

from sklearn.metrics import r2_score
from sklearn.metrics import mean_squared_error
from sklearn.metrics import mean_absolute_error

# 2 - Aplicação do Teste:
#predicao_y = modelo.predict(teste_x)
predicao_y = modelo.predict(teste_x)

# 3 - Avaliação do Teste (com todos os modelos de Metrics):
r2 = r2_score(teste_y, predicao_y)

mse = mean_squared_error(teste_y, predicao_y)
mae = mean_absolute_error(teste_y, predicao_y)

# 4 - Mostrar os resultados:

print(f"R2 (Acuracia): {r2*100:.2f}%")
print(f"MSE : {mse:.2f}")
print(f"MAE : {mae:.2f}")

# fase final

from WazeRouteCalculator import WazeRouteCalculator, WRCError
from geopy.geocoders import Nominatim
from datetime import datetime
import pandas as pd
import warnings
import unicodedata

warnings.filterwarnings("ignore")

# Inicializa geolocalizador
geolocator = Nominatim(user_agent="predictor-app")

def limpar_endereco(endereco):
    nfkd = unicodedata.normalize('NFKD', endereco)
    return u"".join([c for c in nfkd if not unicodedata.combining(c)])

def calcular_distancia_waze(origem, destino, region='EU'):
    try:
        lat1, lng1 = endereco_para_coordenadas(origem)
        lat2, lng2 = endereco_para_coordenadas(destino)

        origem_coord = f"{lat1},{lng1}"
        destino_coord = f"{lat2},{lng2}"

        rota = WazeRouteCalculator(origem_coord, destino_coord, region)
        tempo_min, distancia_km = rota.calc_route_info(real_time=False)  # ou real_time=True, se quiser tráfego atual

        return distancia_km, tempo_min
    except WRCError as e:
        raise ValueError(f"Erro ao calcular rota Waze: {e}")


def endereco_para_coordenadas(endereco):
    endereco_limpo = limpar_endereco(endereco)
    location = geolocator.geocode(endereco_limpo, timeout=15)
    if location:
        return location.latitude, location.longitude
    else:
        raise ValueError(f"Não foi possível geocodificar o endereço: {endereco}")

def gerar_features(end_origem, end_destino, horario=None):
    lat1, lng1 = endereco_para_coordenadas(end_origem)
    lat2, lng2 = endereco_para_coordenadas(end_destino)
    distancia, tempo = calcular_distancia_waze(end_origem, end_destino)

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

def prever_preco(end_origem, end_destino):
    dados = gerar_features(end_origem, end_destino)
    dados_para_prever = dados.drop(columns=["Tempo"])
    preco_estimado = model.predict(dados_para_prever)[0]

    dados["Preco_Previsto"] = preco_estimado
    dados["Endereco_Origem"] = end_origem
    dados["Endereco_Destino"] = end_destino
    return dados

# ================================

if __name__ == "__main__":
    print("=== Previsão de Preço Uber ===")
    origem = input("Digite o endereço de ORIGEM: ").strip()
    destino = input("Digite o endereço de DESTINO: ").strip()

    try:
        resultado = prever_preco(origem, destino)
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
