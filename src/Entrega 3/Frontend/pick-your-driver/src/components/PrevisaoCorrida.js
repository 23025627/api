import React, { useState } from 'react';
import axios from 'axios';

function PrevisaoCorrida() {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [preco, setPreco] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await axios.post('http://localhost:5000/api/prever', {
        origem,
        destino,
      });
      setPreco(resposta.data.preco);
    } catch (err) {
      console.error('Erro ao obter previsão:', err);
    }
  };

  return (
    <div>
      <h2>Prever Preço da Corrida</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Origem"
          value={origem}
          onChange={(e) => setOrigem(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destino"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />
        <button type="submit">Prever</button>
      </form>
      {preco !== null && <p>Preço estimado: R$ {preco.toFixed(2)}</p>}
    </div>
  );
}

export default PrevisaoCorrida;
