import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Asegúrate de que existe un div con id="root" en tu HTML
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // React 18 usa createRoot
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('No se encontró el elemento root en el DOM');
}
