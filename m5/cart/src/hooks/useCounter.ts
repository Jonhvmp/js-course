'use client';

import { useReducer, useCallback } from 'react';
import { CounterState, CounterHookReturn } from '@src/types/counter';
import { counterReducer } from '@src/reducers/counterReducer';

interface UseCounterOptions {
  initialValue?: number;
  step?: number;
  min?: number;
  max?: number;
}

export function useCounter(options: UseCounterOptions = {}): CounterHookReturn {
  const {
    initialValue = 0,
    step = 1,
    min,
    max
  } = options;

  const customInitialState: CounterState = {
    value: initialValue,
    step,
    min,
    max
  };

  const [state, dispatch] = useReducer(counterReducer, customInitialState);

  const increment = useCallback(() => {
    dispatch({ type: 'INCREMENT' });
  }, []);

  const decrement = useCallback(() => {
    dispatch({ type: 'DECREMENT' });
  }, []);

  const setValue = useCallback((value: number) => {
    dispatch({ type: 'SET_VALUE', payload: value });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const setStep = useCallback((step: number) => {
    dispatch({ type: 'SET_STEP', payload: step });
  }, []);

  return {
    state,
    increment,
    decrement,
    setValue,
    reset,
    setStep
  };
}
