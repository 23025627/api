import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VLibras from 'react-vlibras';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './pages/Home';
import SobreNos from './pages/SobreNos';
import SobreProjeto from './pages/SobreProjeto';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoadScript } from '@react-google-maps/api';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 200,
      once: true
    });
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDLZuBuKwtf5kIBRrC7e_Yf3Qaf8RuWi10">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobrenos" element={<SobreNos />} />
          <Route path="/sobreprojeto" element={<SobreProjeto />} />
        </Routes>
        <VLibras safeInit />
      </Router>
    </LoadScript>
  );
}

export default App;
