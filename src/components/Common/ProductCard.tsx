import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  showAddButton?: boolean;
}

export function ProductCard({ product, onAdd, showAddButton = true }: ProductCardProps) {
  const getStockBadge = () => {
    switch (product.stock) {
      case 'poucos-restantes':
        return <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Poucos restantes</span>;
      case 'esgotado':
        return <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Esgotado</span>;
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-warm-200 overflow-hidden ${!product.available ? 'opacity-60' : ''}`}>
      <div className="aspect-video bg-warm-100 relative">
        {product.image && (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        )}
        {!product.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Indisponível hoje</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 flex-1">{product.name}</h3>
          {getStockBadge()}
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary-600">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            <span className="text-sm text-gray-500 ml-1">/{product.unit}</span>
            {product.serves && (
              <p className="text-xs text-gray-500">Serve {product.serves} pessoas</p>
            )}
          </div>
          
          {showAddButton && product.available && (
            <button
              onClick={() => onAdd(product)}
              className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
