import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

type CartContextType = {
  cart: Product[];
  totalPrice: number;
  totalItems: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  const updateLocalStorage = (updatedCart: Product[]) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Calculate total price and total items
    const calculateTotals = () => {
      let totalPrice = 0;
      let totalItems = 0;

      cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;
      });

      setTotalPrice(totalPrice);
      setTotalItems(totalItems);
    };

    calculateTotals();
    updateLocalStorage(cart); // Actualiza el localStorage cuando el carrito cambia
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id);

      if (existingIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += 1;
        return updatedCart;
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, totalPrice, totalItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
};