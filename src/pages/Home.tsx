import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Bienvenido a mi tienda en línea</h1>
      <p>Descubre nuestras últimas ofertas y productos destacados.</p>
      <Link to="/products">Ir a la sección de productos</Link>
      {/* Aquí podrías añadir más contenido */}
    </div>
  );
};

export default Home;
