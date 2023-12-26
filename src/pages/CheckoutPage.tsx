import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../pages/CartContext';

const CheckoutPage = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    // Limpia el carrito después de una compra exitosa
    clearCart();
  }, [clearCart]);

  return (
    <div>
      <h1>Compra Realizada con Éxito</h1>
      <p>Tu compra se ha realizado con éxito. ¡Gracias por tu pedido!</p>
      <Link to="/">Volver a la Página Principal</Link>
    </div>
  );
};

export default CheckoutPage;
