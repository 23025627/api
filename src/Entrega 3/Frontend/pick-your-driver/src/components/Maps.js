import React, { useState, useCallback } from 'react';
import {
  LoadScript,
  GoogleMap,
  DirectionsService,
  DirectionsRenderer
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '20px',
  boxShadow: '20px',
  overflow: 'hidden',     
  boxShadow: '0 2px 2px rgba(0,0,0,0.3)'
};

const center = { lat: -23.5505, lng: -46.6333 }; // São Paulo

function MapWithRoute({ origin, destination }) {
  const [response, setResponse] = useState(null);

  // Callback invocado quando o DirectionsService retorna resultados
  const directionsCallback = useCallback((res) => {
    if (res !== null && res.status === 'OK') {
      setResponse(res);
    }
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDLZuBuKwtf5kIBRrC7e_Yf3Qaf8RuWi10" // Substitua pela sua chave da API do Google Maps
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        {/* Solicita a rota */}
        <DirectionsService
          options={{
            origin: { lat: parseFloat(origin.split(',')[0]), lng: parseFloat(origin.split(',')[1]) },  // Converte origem para lat/lng
            destination: { lat: parseFloat(destination.split(',')[0]), lng: parseFloat(destination.split(',')[1]) }, // Converte destino para lat/lng
            travelMode: 'DRIVING' // Defina o modo de transporte, por exemplo, 'DRIVING', 'WALKING', 'BICYCLING'
          }}
          callback={directionsCallback}
        />

        {/* Exibe a rota no mapa */}
        {response && (
          <DirectionsRenderer
            options={{
              directions: response
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapWithRoute);
