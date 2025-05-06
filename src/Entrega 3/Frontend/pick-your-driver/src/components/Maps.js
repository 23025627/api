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
  borderRadius: '10px',
  overflow: 'hidden',     
  boxShadow: '0 2px 2px rgba(0,0,0,0.3)'
};

const center = { lat: -23.5505, lng: -46.6333 }; // São Paulo

function MapWithRoute() {
  const [response, setResponse] = useState(null);

  // Parâmetros de origem e destino
  const origin = { lat: -23.47986978917453, lng: -46.60072607175314 };
  const destination = { lat: -23.5675, lng: -46.6480 };

  // Callback invocado quando o DirectionsService retorna resultados
  const directionsCallback = useCallback((res) => {
    if (res !== null && res.status === 'OK') {
      setResponse(res);
    }
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDLZuBuKwtf5kIBRrC7e_Yf3Qaf8RuWi10"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        {/* Solicita a rota */}
        <DirectionsService
          options={{
            origin,
            destination,
            travelMode: 'DRIVING' // WALKING, BICYCLING, TRANSIT…
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
