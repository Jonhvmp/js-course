import { useReducer, useCallback, useMemo, useEffect } from 'react';
import { Product } from '@src/types/product';
import { CartState, CartAction } from '@src/types/cart';
import { cartReducer, initialCartState } from '@src/reducers/cartReducer';
import { useLocalStorage } from './useLocalStorage';

export function useCart() {
  const [persistedCart, setPersistedCart] = useLocalStorage<CartState>('shopping-cart', initialCartState);
  const [state, dispatch] = useReducer(cartReducer, persistedCart);

  // Salvar no localStorage sempre que o estado mudar
  useEffect(() => {
    setPersistedCart(state);
  }, [state, setPersistedCart]);

  // Actions memoizadas para performance
  const addItem = useCallback((product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const applyDiscount = useCallback((discount: number) => {
    dispatch({ type: 'APPLY_DISCOUNT', payload: discount });
  }, []);

  const setShipping = useCallback((shipping: number) => {
    dispatch({ type: 'SET_SHIPPING', payload: shipping });
  }, []);

  // Funções computadas com useMemo para performance
  const getTotalPrice = useMemo(() => state.total, [state.total]);
  
  const getTotalItems = useMemo(() => state.totalItems, [state.totalItems]);
  
  const getFinalTotal = useMemo(() => state.finalTotal, [state.finalTotal]);
  
  const getItemById = useCallback((id: string) => {
    return state.items.find(item => item.product.id === id);
  }, [state.items]);

  const getItemQuantity = useCallback((id: string) => {
    const item = getItemById(id);
    return item ? item.quantity : 0;
  }, [getItemById]);

  const isInCart = useCallback((id: string) => {
    return state.items.some(item => item.product.id === id);
  }, [state.items]);

  const getCartSummary = useMemo(() => ({
    itemsCount: state.totalItems,
    subtotal: state.total,
    discount: (state.total * state.discount) / 100,
    shipping: state.shipping,
    total: state.finalTotal
  }), [state.total, state.totalItems, state.discount, state.shipping, state.finalTotal]);

  return {
    state,
    dispatch,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyDiscount,
    setShipping,
    getTotalPrice,
    getTotalItems,
    getFinalTotal,
    getItemById,
    getItemQuantity,
    isInCart,
    getCartSummary
  };
}
