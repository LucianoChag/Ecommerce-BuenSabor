import React, { createContext, useContext, useState, useEffect } from 'react';
import CartInstrumento from '../types/CartInstrumento';
import Instrumento from '../types/Instrumento';
import { useAuth } from '../contexts/AuthContext';

// Creamos el contexto del carrito
interface CartContextType {
  cart: CartInstrumento[];
  addToCart: (productId: number, products: Instrumento[]) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook para acceder al contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, userId } = useAuth(); // Obtener el estado de autenticación y el usuario actual
  const [cart, setCart] = useState<CartInstrumento[]>([]);

  // Función para guardar el carrito en el localStorage asociado al usuario
  const saveCartToLocalStorage = (userId: string, cart: CartInstrumento[]) => {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  };

  // Función para cargar el carrito desde el localStorage asociado al usuario
  const loadCartFromLocalStorage = (userId: string): CartInstrumento[] => {
    const cartJSON = localStorage.getItem(`cart_${userId}`);
    return cartJSON ? JSON.parse(cartJSON) : [];
  };

  useEffect(() => {
    if (isAuthenticated && userId) {
      // Cargar el carrito asociado al usuario actual cuando se autentica
      const userCart = loadCartFromLocalStorage(userId);
      setCart(userCart);
    } else {
      // Limpiar el carrito si no hay usuario autenticado
      clearCart();
    }
  }, [isAuthenticated, userId]);

  const addToCart = (productId: number, products: Instrumento[]) => {
    const existingProductIndex = cart.findIndex((item) => item.id === productId);
    if (existingProductIndex !== -1) {
      const updatedCart = cart.map((item, index) =>
        index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      saveCartToLocalStorage(userId, updatedCart); // Guardar el carrito actualizado
    } else {
      const productToAdd = products.find((product) => product.id === productId);
      if (productToAdd) {
        setCart([...cart, { ...productToAdd, quantity: 1 }]);
        saveCartToLocalStorage(userId, [...cart, { ...productToAdd, quantity: 1 }]); // Guardar el carrito actualizado
      }
    }
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        const updatedCart = prevCart.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        saveCartToLocalStorage(userId, updatedCart); // Guardar el carrito actualizado
        return updatedCart;
      } else {
        const updatedCart = prevCart.filter(item => item.id !== id);
        saveCartToLocalStorage(userId, updatedCart); // Guardar el carrito actualizado
        return updatedCart;
      }
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(`cart_${userId}`); // Limpiar el carrito asociado al usuario
  };

  const cartContextValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;