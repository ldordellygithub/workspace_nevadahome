import './styles/App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';  // Importamos las rutas
import Header from './components/pages/Header';
import FooterWrapper from './components/pages/FooterWrapper';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <AppRoutes /> {/* Llamamos a las rutas desde un archivo separado */}
      <FooterWrapper /> {/* Componente de pie de página */}
    </BrowserRouter>
  );
}

export default App;
