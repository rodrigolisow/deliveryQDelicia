import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CartPreviewProps {
  onOpenCart: () => void;
}

export function CartPreview({ onOpenCart }: CartPreviewProps) {
  const { state } = useApp();
  
  const total = state.cart.reduce((sum, item) => sum + item.subtotal, 0);
  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  
  if (state.cart.length === 0) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-30">
      <button
        onClick={onOpenCart}
        className="w-full bg-primary-600 text-white py-4 px-6 rounded-xl shadow-lg flex items-center justify-between hover:bg-primary-700 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-white text-primary-600 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {itemCount}
            </span>
          </div>
          <span className="font-semibold">Finalizar Pedido</span>
        </div>
        <span className="font-bold text-lg">
          R$ {total.toFixed(2).replace('.', ',')}
        </span>
      </button>
    </div>
  );
}
