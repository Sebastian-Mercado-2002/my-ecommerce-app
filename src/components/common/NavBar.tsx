import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function NavBar() {
  const history = useHistory();
  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    // Limpiar la información del usuario al cerrar sesión
    localStorage.removeItem('token');
    // Redireccionar al usuario a la página de inicio
    history.push('/home');
  };

  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none' }}>
        <li style={{ margin: '0 10px' }}>
          <Link to="/Home">Principal</Link>
        </li>
        <li style={{ margin: '0 10px' }}>
          <Link to="/login">Iniciar Sesión</Link>
        </li>
        <li style={{ margin: '0 10px' }}>
          <Link to="/Register">Registrarse</Link>
        </li>
        <li style={{ margin: '0 10px' }}>
          <Link to="/Products">Productos</Link>
        </li>
        <li style={{ margin: '0 10px' }}>
          <Link to="/ProductCreate">Crear Producto</Link>
        </li>
        <li style={{ margin: '0 10px' }}>
            <Link to="/CartView">Carrito</Link>
          </li>
        {userRole === 'admin' && (
          <li style={{ margin: '0 10px' }}>
            <Link to="/Categories">Categorías</Link>
          </li>
        )}
        <li style={{ margin: '0 10px' }}>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </li>
        {/* Agregar más enlaces */}
      </ul>
    </nav>
  );
}

export default NavBar;