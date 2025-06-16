import React from 'react';
import { motion } from 'framer-motion';
import { cardVariants } from '@src/utils/animations';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hoverable = false
}) => {
  const baseClasses = 'rounded-xl transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white shadow-sm border border-gray-200',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-transparent border-2 border-gray-300'
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };
  
  return (
    <motion.div
      variants={hoverable ? cardVariants : undefined}
      initial={hoverable ? "hidden" : undefined}
      animate={hoverable ? "visible" : undefined}
      whileHover={hoverable ? "hover" : undefined}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default Card;
