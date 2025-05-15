import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'stream-http';
import 'https-browserify';
import 'util';
import 'browserify-zlib';
import 'stream-browserify';
import 'crypto-browserify';
import 'url';
import 'assert';
import { Buffer } from 'buffer';
window.Buffer = Buffer;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <App />
  </React.StrictMode>
);

reportWebVitals();
