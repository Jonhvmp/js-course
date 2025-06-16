import { CartState, CartAction } from '@src/types/cart';

export const initialCartState: CartState = {
  items: [],
  total: 0,
  totalItems: 0,
  discount: 0,
  shipping: 0,
  finalTotal: 0
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);

      let newItems;
      if (existingItem) {
        newItems = state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.product.stock) }
            : item
        );
      } else {
        newItems = [...state.items, { product: action.payload, quantity: 1 }];
      }

      return calculateTotals({ ...state, items: newItems });
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.product.id !== action.payload);
      return calculateTotals({ ...state, items: newItems });
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        const newItems = state.items.filter(item => item.product.id !== id);
        return calculateTotals({ ...state, items: newItems });
      }

      const newItems = state.items.map(item =>
        item.product.id === id
          ? { ...item, quantity: Math.min(quantity, item.product.stock) }
          : item
      );

      return calculateTotals({ ...state, items: newItems });
    }

    case 'CLEAR_CART':
      return initialCartState;

    case 'APPLY_DISCOUNT':
      return calculateTotals({ ...state, discount: action.payload });

    case 'SET_SHIPPING':
      return calculateTotals({ ...state, shipping: action.payload });

    default:
      return state;
  }
}

function calculateTotals(state: CartState): CartState {
  const total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const discountAmount = (total * state.discount) / 100;
  const finalTotal = total - discountAmount + state.shipping;

  return {
    ...state,
    total,
    totalItems,
    finalTotal: Math.max(0, finalTotal)
  };
}
