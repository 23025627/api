from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.ensemble import RandomForestRegressor
from pi import load_data, preprocess, treinar_modelo, prever_preco
import mysql.connector
import warnings

warnings.filterwarnings("ignore")

app = Flask(__name__)
CORS(app)

# Treina o modelo uma vez ao iniciar a API
print("Treinando modelo...")
df = load_data()
treino_x, teste_x, treino_y, teste_y = preprocess(df)
modelo = treinar_modelo(treino_x, treino_y, RandomForestRegressor(random_state=20))


def salvar_previsao_mysql(origem, destino, lat1, lng1, lat2, lng2, distancia, tempo, preco):
    try:
        conn = mysql.connector.connect(
            host="doamaisbd.mysql.database.azure.com",
            user="doamaisadmin",
            password="ChargeBack2nads",
            database="doamais",
            ssl_disabled=False
        )
        cursor = conn.cursor()

        nome = "Usuário API"
        email = "api@exemplo.com"

        query = """
            INSERT INTO viagens (
                nome, email, endereco_partida, endereco_destino,
                latitude_partida, longitude_partida,
                latitude_destino, longitude_destino,
                distancia_kilometros, tempo_estimado, preco_estimado
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        valores = (
            nome, email, origem, destino, lat1, lng1, lat2, lng2,
            distancia, f"{int(tempo)} minutos", preco
        )

        cursor.execute(query, valores)
        conn.commit()
        cursor.close()
        conn.close()

    except mysql.connector.Error as err:
        print(f"Erro ao salvar no banco: {err}")


@app.route("/api/prever", methods=["POST"])
def api_prever():
    dados = request.get_json()
    origem = dados.get("origem")
    destino = dados.get("destino")

    if not origem or not destino:
        return jsonify({"erro": "Origem e destino são obrigatórios"}), 400

    try:
        resultado = prever_preco(modelo, origem, destino)
        preco = resultado["Preco_Previsto"].values[0]
        distancia = resultado["Distancia"].values[0]
        tempo = resultado["Tempo"].values[0]
        lat1 = resultado["Lat1"].values[0]
        lng1 = resultado["Lng1"].values[0]
        lat2 = resultado["Lat2"].values[0]
        lng2 = resultado["Lng2"].values[0]

        salvar_previsao_mysql(origem, destino, lat1, lng1, lat2, lng2, distancia, tempo, preco)

        return jsonify({
            "preco_ubex": round(preco, 2),
            "preco_confort": round(preco * 1.25, 2),
            "preco_black": round(preco * 1.25 * 1.24, 2),
            "distancia_km": round(distancia, 2),
            "tempo_min": round(tempo, 0)
        })

    except Exception as e:
        return jsonify({"erro": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
