import { CounterState, CounterAction } from '@src/types/counter';

export const initialCounterState: CounterState = {
  value: 0,
  step: 1,
  min: 0,
  max: undefined
};

export function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT': {
      const newValue = state.value + state.step;
      return {
        ...state,
        value: state.max !== undefined ? Math.min(newValue, state.max) : newValue
      };
    }
    
    case 'DECREMENT': {
      const newValue = state.value - state.step;
      return {
        ...state,
        value: state.min !== undefined ? Math.max(newValue, state.min) : newValue
      };
    }
    
    case 'SET_VALUE': {
      let newValue = action.payload;
      
      if (state.min !== undefined) {
        newValue = Math.max(newValue, state.min);
      }
      
      if (state.max !== undefined) {
        newValue = Math.min(newValue, state.max);
      }
      
      return {
        ...state,
        value: newValue
      };
    }
    
    case 'RESET':
      return {
        ...state,
        value: state.min ?? 0
      };
    
    case 'SET_STEP':
      return {
        ...state,
        step: Math.max(1, action.payload)
      };
    
    default:
      return state;
  }
}
