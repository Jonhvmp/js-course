export interface CounterState {
  value: number;
  step: number;
  min?: number;
  max?: number;
}

export type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_VALUE'; payload: number }
  | { type: 'RESET' }
  | { type: 'SET_STEP'; payload: number };

export interface CounterHookReturn {
  state: CounterState;
  increment: () => void;
  decrement: () => void;
  setValue: (value: number) => void;
  reset: () => void;
  setStep: (step: number) => void;
}
