import React, { useState } from 'react';
import axios from 'axios';

function PrevisaoCorrida() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [enderecoPartida, setEnderecoPartida] = useState('');
  const [enderecoDestino, setEnderecoDestino] = useState('');
  const [resposta, setResposta] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post('http://localhost:5000/api/prever', {
  nome,
  email,
  endereco_partida: enderecoPartida,
  endereco_destino: enderecoDestino,
  });

      setResposta(resp.data);
    } catch (err) {
      console.error('Erro ao obter previsão:', err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>Prever Preço da Corrida</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Endereço de partida"
          value={enderecoPartida}
          onChange={(e) => setEnderecoPartida(e.target.value)}
        />
        <input
          type="text"
          placeholder="Endereço de destino"
          value={enderecoDestino}
          onChange={(e) => setEnderecoDestino(e.target.value)}
        />
        <button type="submit">Prever</button>
      </form>

      {resposta && (
        <div>
          <p>Preço Ubex: R$ {resposta.preco_ubex}</p>
          <p>Preço Confort: R$ {resposta.preco_confort}</p>
          <p>Preço Black: R$ {resposta.preco_black}</p>
          <p>Distância: {resposta.distancia_km} km</p>
          <p>Tempo estimado: {resposta.tempo_estimado_min} min</p>
        </div>
      )}
    </div>
  );
}

export default PrevisaoCorrida;
