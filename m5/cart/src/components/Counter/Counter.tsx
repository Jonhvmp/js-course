import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { useCounter } from '@src/hooks/useCounter';
import { counterVariants } from '@src/utils/animations';
import Button from '@src/components/ui/Button';

interface CounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Counter: React.FC<CounterProps> = ({
  initialValue = 0,
  min = 0,
  max,
  step = 1,
  onChange,
  size = 'md',
  className = ''
}) => {
  const { state, increment, decrement, setValue } = useCounter({
    initialValue,
    min,
    max,
    step
  });

  const handleIncrement = () => {
    increment();
    onChange?.(state.value + step);
  };

  const handleDecrement = () => {
    decrement();
    onChange?.(state.value - step);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || min || 0;
    setValue(newValue);
    onChange?.(newValue);
  };

  const sizeClasses = {
    sm: {
      container: 'gap-1',
      button: 'w-6 h-6 text-xs',
      input: 'w-12 h-6 text-xs'
    },
    md: {
      container: 'gap-2',
      button: 'w-8 h-8 text-sm',
      input: 'w-16 h-8 text-sm'
    },
    lg: {
      container: 'gap-3',
      button: 'w-10 h-10 text-base',
      input: 'w-20 h-10 text-base'
    }
  };

  const currentSize = sizeClasses[size];
  const canDecrement = min === undefined || state.value > min;
  const canIncrement = max === undefined || state.value < max;

  return (
    <motion.div
      variants={counterVariants}
      initial="hidden"
      animate="visible"
      className={`flex items-center ${currentSize.container} ${className}`}
    >
      <Button
        variant="outline"
        size="sm"
        className={`${currentSize.button} p-0 rounded-full border-gray-300 hover:border-gray-400`}
        onClick={handleDecrement}
        disabled={!canDecrement}
      >
        <Minus className="w-3 h-3" />
      </Button>

      <motion.input
        key={state.value}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        type="number"
        value={state.value}
        onChange={handleInputChange}
        min={min}
        max={max}
        step={step}
        className={`
          ${currentSize.input}
          text-center
          border
          border-gray-300
          rounded-md
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          outline-none
          transition-all
          duration-200
        `}
      />

      <Button
        variant="outline"
        size="sm"
        className={`${currentSize.button} p-0 rounded-full border-gray-300 hover:border-gray-400`}
        onClick={handleIncrement}
        disabled={!canIncrement}
      >
        <Plus className="w-3 h-3" />
      </Button>
    </motion.div>
  );
};

export default Counter;
