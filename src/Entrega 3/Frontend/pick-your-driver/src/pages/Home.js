import React, { useState } from 'react';
import styled from 'styled-components';
import { LoadScript, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import imagemuberblack from '../assets/uber_black.png';
import imagemubercomfort from '../assets/uber_comfort.png';
import imagemuberx from '../assets/uber_x.png';

const HomeContainer = styled.div``;

function Home() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [directions, setDirections] = useState(null);
  const [prices, setPrices] = useState({ uberX: null, comfort: null, black: null });
  const [time, setTime] = useState('');
  const [distance, setDistance] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleDirectionsCallback = (result) => {
    if (result?.status === 'OK') {
      setDirections(result);

      
      const route = result.routes[0];
      const leg = route.legs[0];
      setDistance(leg.distance.text);
      setTime(leg.duration.text);
    }
  };

  const handleGetRoute = async () => {
    if (origin && destination && window.google) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        handleDirectionsCallback
      );
  
      // Fazendo a requisição para a API Flask
      setLoading(true); 
      try {
        const response = await fetch('http://localhost:5000/api/prever', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ origem: origin, destino: destination }),
        });
  
        if (response.ok) {
          const data = await response.json();
          setPrices({
            uberX: data.preco_ubex,
            comfort: data.preco_confort,
            black: data.preco_black,
          });
          setDistance(data.distancia_km);
          setTime(data.tempo_min);
          
          // Recalcular a rota após obter a resposta da API
          directionsService.route(
            {
              origin,
              destination,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            handleDirectionsCallback
          );
          
        } else {
          const errorData = await response.json();
          alert(`Erro: ${errorData.erro}`);
        }
      } catch (error) {
        console.error('Erro ao conectar com a API:', error);
        alert('Erro ao conectar com a API');
      } finally {
        setLoading(false); 
      }
    } else {
      alert('Por favor, preencha origem e destino.');
    }
  };
  

  return (
    <LoadScript googleMapsApiKey="AIzaSyDLZuBuKwtf5kIBRrC7e_Yf3Qaf8RuWi10">
      <HomeContainer>
        <NavBar />
        <div className="text-center p-4 p-lg-5">
          <h1 className="fw-bold mb-4">Nunca foi tão fácil comparar os preços das suas corridas</h1>
        </div>
        <div className="container">
          <div className="row">
            <h1 style={{ fontSize: "16px", marginTop: "20px", marginBottom: "20px" }}>
              Planeje a sua próxima viagem com a nossa calculadora de preço.
            </h1>
            <div className="col-md-6">
              <h1 className="fs-5" style={{ marginTop: "10px" }}>Nome</h1>
              <input type="text" style={{ width: "300px" }} />

              <h1 className="fs-5" style={{ marginTop: "10px" }}>E-mail</h1>
              <input type="email" style={{ width: "300px" }} />

              <h1 className="fs-5" style={{ marginTop: "10px" }}>Saindo de</h1>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Digite o ponto de origem"
                style={{ width: "300px" }}
              />

              <h1 className="fs-5" style={{ marginTop: "10px" }}>Indo Para</h1>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Digite o destino"
                style={{ width: "300px" }}
              />

              <button
                type="button"
                className="btn btn-dark"
                style={{ fontWeight: "bold", marginTop: "20px", display: "flex" }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                onClick={handleGetRoute}
                disabled={loading} 
              >
                {loading ? 'Carregando...' : 'Ver preços'}
              </button>
            </div>

            <div className="col-md-6">
            <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px", boxShadow: '2px 2px 2px', borderRadius: '20px' }}
            center={{ lat: -23.55052, lng: -46.63331 }}zoom={14}>
              {directions && <DirectionsRenderer directions={directions} />}
              </GoogleMap>

            </div>
          </div>
        </div>

        <div className="container py-4 py-xl-5">
          <div className="row mb-5">
            <h2 style={{ textAlign: "left", marginTop: "20px", marginBottom: "20px", fontWeight: "bold" }}>
              De qual maneira são determinados os preços?
            </h2>
            <h1 style={{ fontSize: "16px", marginTop: "20px", marginBottom: "20px" }}>
              Veja algumas taxas e fatores que podem afetar o preço das corridas:
            </h1>
          </div>

          <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
            <div className="col">
              <div className="card">
                <div className="card-body p-4" style={{ height: "280px" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="33" height="64" fill="currentColor"
                    className="bi bi-wallet2" viewBox="0 0 16 16">
                    <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9A1.5 1.5 0 0 1 1.432 2.001zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" />
                  </svg>
                  <h4 className="card-title">Tarifa base</h4>
                  <p className="card-text">A tarifa base é determinada pela duração e pela distância de uma viagem.</p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card">
                <div className="card-body p-4" style={{ height: "280px" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="33" height="64" fill="currentColor"
                    className="bi bi-gear-wide-connected" viewBox="0 0 16 16">
                    <path d="M0 0h1v15h15v1H0zm10 3.5..." />
                  </svg>
                  <h4 className="card-title">Taxa de operação</h4>
                  <p className="card-text">
                    Pode haver uma taxa fixa a cada viagem, para cobrir os custos operacionais e de segurança.
                  </p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card">
                <div className="card-body p-4" style={{ height: "280px" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="33" height="64" fill="currentColor"
                    className="bi bi-graph-up-arrow" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M0 0h1v15h15v1H0zm10 3.5..." />
                  </svg>
                  <h4 className="card-title">Surge pricing</h4>
                  <p className="card-text">Os preços podem aumentar em horários de pico ou alta demanda.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal com os preços calculados */}
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Aqui estão os preços das corridas que você solicitou</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="container text-center">
                  <div className="row justify-content-center">
                    <div className="col-md-4 mb-3">
                      <div className="card shadow-sm">
                        <img src={imagemuberblack} className="card-img-top" alt="Uber Black" style={{ height: '150px', objectFit: 'contain' }} />
                        <div className="card-body">
                          <h5 className="card-title">Uber Black</h5>
                          <p className="card-text">Preço estimado: R$ {prices.black}</p>
                          <p className="card-title">Tempo Estimado: {time}</p>
                          <p className="card-title">Distância: {distance}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="card shadow-sm">
                        <img src={imagemubercomfort} className="card-img-top" alt="Uber Comfort" style={{ height: '150px', objectFit: 'contain' }} />
                        <div className="card-body">
                          <h5 className="card-title">Uber Comfort</h5>
                          <p className="card-text">Preço estimado: R$ {prices.comfort}</p>
                          <p className="card-title">Tempo Estimado: {time}</p>
                          <p className="card-title">Distância: {distance}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="card shadow-sm">
                        <img src={imagemuberx} className="card-img-top" alt="Uber X" style={{ height: '150px', objectFit: 'contain' }} />
                        <div className="card-body">
                          <h5 className="card-title">Uber X</h5>
                          <p className="card-text">Preço estimado: R$ {prices.uberX}</p>
                          <p className="card-title">Tempo Estimado: {time}</p>
                          <p className="card-title">Distância: {distance}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </HomeContainer>
    </LoadScript>
  );
}

export default Home;
