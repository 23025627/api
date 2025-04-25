import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VLibras from 'react-vlibras';
import Home from './pages/Home';
import SobreNos from './pages/SobreNos';
import SobreProjeto from './pages/SobreProjeto';

function App() {
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
