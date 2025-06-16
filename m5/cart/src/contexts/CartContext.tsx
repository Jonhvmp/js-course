'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useCart } from '@src/hooks/useCart';
import { Product } from '@src/types/product';
import { CartState, CartItem } from '@src/types/cart';

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (discount: number) => void;
  setShipping: (shipping: number) => void;
  getTotalPrice: number;
  getTotalItems: number;
  getFinalTotal: number;
  getItemById: (id: string) => CartItem | undefined;
  getItemQuantity: (id: string) => number;
  isInCart: (id: string) => boolean;
  getCartSummary: {
    itemsCount: number;
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const cartHook = useCart();

  return (
    <CartContext.Provider value={cartHook}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }

  return context;
}
