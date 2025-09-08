import React from 'react';
import { Home, ShoppingCart, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface BottomNavProps {
  currentView: 'home' | 'cart' | 'account';
  onViewChange: (view: 'home' | 'cart' | 'account') => void;
}

export function BottomNav({ currentView, onViewChange }: BottomNavProps) {
  const { state } = useApp();
  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-warm-200 z-40">
      <div className="flex">
        <button
          onClick={() => onViewChange('home')}
          className={`flex-1 flex flex-col items-center py-3 px-2 space-y-1 ${
            currentView === 'home' ? 'text-primary-600' : 'text-gray-500'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Início</span>
        </button>
        
        <button
          onClick={() => onViewChange('cart')}
          className={`flex-1 flex flex-col items-center py-3 px-2 space-y-1 relative ${
            currentView === 'cart' ? 'text-primary-600' : 'text-gray-500'
          }`}
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartItemsCount > 9 ? '9+' : cartItemsCount}
              </span>
            )}
          </div>
          <span className="text-xs font-medium">Carrinho</span>
        </button>
        
        <button
          onClick={() => onViewChange('account')}
          className={`flex-1 flex flex-col items-center py-3 px-2 space-y-1 ${
            currentView === 'account' ? 'text-primary-600' : 'text-gray-500'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">Conta</span>
        </button>
      </div>
    </nav>
  );
}
