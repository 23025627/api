from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.ensemble import RandomForestRegressor
from pi import load_data, preprocess, treinar_modelo, prever_preco  # importa suas funções
import warnings


warnings.filterwarnings("ignore")

app = Flask(__name__)
CORS(app)

# Treina modelo uma vez ao iniciar a API
print("Treinando modelo...")
df = load_data()
treino_x, teste_x, treino_y, teste_y = preprocess(df)
modelo = treinar_modelo(treino_x, treino_y, RandomForestRegressor(random_state=20))

@app.route("/api/prever", methods=["POST"])
def api_prever():
    dados = request.get_json()
    print(dados)  # Adicionando print para verificar os dados recebidos
    origem = dados.get("origem")
    destino = dados.get("destino")

    if not origem or not destino:
        return jsonify({"erro": "Origem e destino são obrigatórios"}), 400

    try:
        resultado = prever_preco(modelo, origem, destino)
        preco = resultado["Preco_Previsto"].values[0]
        distancia = resultado["Distancia"].values[0]
        tempo = resultado["Tempo"].values[0]

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
