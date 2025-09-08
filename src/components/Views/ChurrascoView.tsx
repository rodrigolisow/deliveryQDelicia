import React, { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getProductsByCategory } from '../../data/products';
import { QuantitySelector } from '../Common/QuantitySelector';
import { Product } from '../../types';

interface ChurrascoViewProps {
  onBack: () => void;
  onNavigateToAdicionais: (mainProducts: Array<{product: Product, quantity: number}>) => void;
}

export function ChurrascoView({ onBack, onNavigateToAdicionais }: ChurrascoViewProps) {
  const { dispatch } = useApp();
  const [selections, setSelections] = useState<Record<string, number>>({});

  const churrascos = getProductsByCategory('churrasco').filter(p => p.available);

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity === 0) {
      const newSelections = { ...selections };
      delete newSelections[productId];
      setSelections(newSelections);
    } else {
      setSelections(prev => ({ ...prev, [productId]: quantity }));
    }
  };

  const handleAddToCart = () => {
    const selectedProducts = Object.entries(selections).map(([productId, quantity]) => {
      const product = churrascos.find(p => p.id === productId)!;
      dispatch({
        type: 'ADD_TO_CART',
        payload: { product, quantity }
      });
      return { product, quantity };
    });

    onNavigateToAdicionais(selectedProducts);
  };

  const getTotalPrice = () => {
    return Object.entries(selections).reduce((total, [productId, quantity]) => {
      const product = churrascos.find(p => p.id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const hasSelections = Object.keys(selections).length > 0;

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="sticky top-0 bg-white border-b border-warm-200 z-10">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-2">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">Churrascos</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Selecione os cortes e ajuste as quantidades
          </p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {churrascos.map((produto) => {
          const quantity = selections[produto.id] || 0;
          const isSelected = quantity > 0;

          return (
            <div
              key={produto.id}
              className={`bg-white rounded-xl border-2 transition-all ${
                isSelected 
                  ? 'border-primary-300 shadow-md' 
                  : 'border-warm-200'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="aspect-square w-20 h-20 bg-warm-100 rounded-lg overflow-hidden flex-shrink-0">
                    {produto.image && (
                      <img 
                        src={produto.image} 
                        alt={produto.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{produto.name}</h3>
                      {produto.stock === 'poucos-restantes' && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Poucos restantes
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{produto.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-primary-600">
                          R$ {produto.price.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-sm text-gray-500">/{produto.unit}</span>
                      </div>
                      
                      <QuantitySelector
                        quantity={quantity}
                        onQuantityChange={(qty) => handleQuantityChange(produto.id, qty)}
                        min={0}
                        max={10}
                      />
                    </div>
                  </div>
                </div>
                
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-primary-200 bg-primary-25 -m-4 p-4 rounded-b-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600 font-medium">Subtotal:</span>
                      <span className="font-bold text-primary-600">
                        R$ {(produto.price * quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {hasSelections && (
          <div className="bg-white border border-warm-200 rounded-xl p-4 sticky bottom-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Total:</span>
              <span className="text-xl font-bold text-primary-600">
                R$ {getTotalPrice().toFixed(2).replace('.', ',')}
              </span>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Adicionar ao carrinho</span>
            </button>
          </div>
        )}

        {/* Info */}
        <div className="bg-warm-50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Sobre nossos cortes:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Carnes selecionadas e temperadas</li>
            <li>• Preparadas na hora para sua retirada</li>
            <li>• Cortes tradicionais do churrasco brasileiro</li>
            <li>• Qualidade garantida</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
