'use client';

import { useLocalStorage } from '@/hooks/use-local-storage.hook';
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

type CartItem = {
  id: number;
  quantity: number;
  price: number;
  name: string;
  image: string;
};

type CartContext = {
  addCartItem: (item: CartItem) => void;
  deleteCartItem: (id: number) => void;
  incrementItemQuantity: (id: number) => void;
  decrementItemQuantity: (id: number) => void;
  emptyCart: () => void;
  getCurrentQuantity: (id: number) => number;
  cartSize: number;
  totalPrice: number;
  cartItems: CartItem[];
};

const CartContext = createContext<CartContext>({} as CartContext);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: { children: ReactNode }) {
  // const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);

  const cartSize = cartItems.reduce(
    (accum, currentItem) => (accum += currentItem.quantity),
    0
  );

  const totalPrice = cartItems.reduce(
    (accum, currentItem) => (accum += currentItem.quantity * currentItem.price),
    0
  );

  const emptyCart = () => {
    setCartItems([]);
  };

  const getCurrentQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 1;
  };

  const addCartItem = (newItem: CartItem) => {
    if (!cartItems.find((item) => item.id === newItem.id)) {
      setCartItems([...cartItems, newItem]);
    } else {
      const nextCartItems = cartItems.map((item) => {
        return item.id === newItem.id
          ? { ...newItem, quantity: item.quantity + newItem.quantity }
          : item;
      });
      setCartItems(nextCartItems);
    }
  };

  const deleteCartItem = (id: number) => {
    const nextCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(nextCartItems);
  };

  const incrementItemQuantity = (id: number) => {
    const nextCartItems = cartItems.map((item) => {
      return item.id === id ? { ...item, quantity: item.quantity + 1 } : item;
    });

    setCartItems(nextCartItems);
  };

  const decrementItemQuantity = (id: number) => {
    const nextCartItems = cartItems.map((item) => {
      return item.id === id ? { ...item, quantity: item.quantity - 1 } : item;
    });

    setCartItems(nextCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        addCartItem,
        deleteCartItem,
        emptyCart,
        getCurrentQuantity,
        incrementItemQuantity,
        decrementItemQuantity,
        cartSize,
        totalPrice,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
