import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function QuantitySelector({ 
  quantity, 
  onQuantityChange, 
  min = 0, 
  max = 10,
  size = 'md' 
}: QuantitySelectorProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onQuantityChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className={`${sizeClasses[size]} rounded-full border-2 border-primary-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-50 transition-colors`}
      >
        <Minus className={`${iconSizes[size]} text-primary-600`} />
      </button>
      
      <span className="font-semibold text-lg min-w-[2rem] text-center">
        {quantity}
      </span>
      
      <button
        onClick={() => onQuantityChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className={`${sizeClasses[size]} rounded-full border-2 border-primary-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-50 transition-colors`}
      >
        <Plus className={`${iconSizes[size]} text-primary-600`} />
      </button>
    </div>
  );
}
