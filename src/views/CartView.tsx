import React from 'react';
import { useCart } from '../pages/CartContext';
import { Link } from 'react-router-dom'; 
import { Product } from './ProductListView';

const CartView = () => {
    const { cart, totalPrice, removeFromCart, addToCart } = useCart();
  
    const handleAdd = (product: Product) => {
      addToCart(product);
    };
  
    const handleRemove = (productId: number) => {
      removeFromCart(productId);
    };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <div>
        {cart.length === 0 ? (
          <p>No hay productos en el carrito</p>
        ) : (
          <div>
            {cart.map((product) => (
              <div key={product.id}>
                <h3>{product.title}</h3>
                <p>Precio: {product.price}</p>
                <p>Cantidad: {product.quantity}</p>
                <p>Subtotal: {product.price * product.quantity}</p>
                <button onClick={() => handleAdd(product as Product)}>Añadir uno más</button>
                <button onClick={() => handleRemove(product.id)}>Quitar uno</button>
              </div>
            ))}
            <p>Total: {totalPrice}</p>
            <Link to="/checkout">Finalizar Compra</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartView;
