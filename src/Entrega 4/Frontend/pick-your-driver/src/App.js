import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VLibras from 'react-vlibras';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './pages/Home';
import SobreNos from './pages/SobreNos';
import SobreProjeto from './pages/SobreProjeto';

function App() {
    // 1) Hook de inicialização do AOS
    useEffect(() => {
      AOS.init({
        duration: 800,   // duração da animação em ms
        offset: 200,     // distância do topo para ativar
        once: true       // só anima uma vez
      });
    }, []);  
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/sobrenos" element = {<SobreNos />}/>
        <Route path="/sobreprojeto" element = {<SobreProjeto />}/>
      </Routes>
      <VLibras safeInit />
    </Router>   
  );
}

export default App;
