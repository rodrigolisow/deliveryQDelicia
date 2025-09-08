import React, { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getProductsByCategory } from '../../data/products';
import { QuantitySelector } from '../Common/QuantitySelector';
import { Product } from '../../types';

interface AdicionaisViewProps {
  onBack: () => void;
  onFinish: () => void;
  mainProducts: Array<{product: Product, quantity: number}>;
}

export function AdicionaisView({ onBack, onFinish, mainProducts }: AdicionaisViewProps) {
  const { dispatch } = useApp();
  const [selections, setSelections] = useState<Record<string, number>>({});

  const adicionais = getProductsByCategory('adicional').filter(p => p.available);

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity === 0) {
      const newSelections = { ...selections };
      delete newSelections[productId];
      setSelections(newSelections);
    } else {
      setSelections(prev => ({ ...prev, [productId]: quantity }));
    }
  };

  const handleFinish = () => {
    // Add adicionais to cart
    Object.entries(selections).forEach(([productId, quantity]) => {
      const product = adicionais.find(p => p.id === productId)!;
      dispatch({
        type: 'ADD_TO_CART',
        payload: { product, quantity }
      });
    });

    onFinish();
  };

  const handleSkip = () => {
    onFinish();
  };

  const getTotalPrice = () => {
    return Object.entries(selections).reduce((total, [productId, quantity]) => {
      const product = adicionais.find(p => p.id === productId);
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
            <h2 className="text-xl font-bold text-gray-900">Adicionais</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Complemente seu pedido (opcional)
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Main products summary */}
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
          <h3 className="font-semibold text-primary-800 mb-2">Seus produtos principais:</h3>
          <div className="space-y-1">
            {mainProducts.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-primary-700">
                  {item.quantity}x {item.product.name}
                </span>
                <span className="font-medium text-primary-800">
                  R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Adicionais */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Complementos:</h3>
          
          {/* Maionese */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Maionese</h4>
            {adicionais.filter(p => p.type === 'maionese').map((produto) => {
              const quantity = selections[produto.id] || 0;
              
              return (
                <div key={produto.id} className="bg-white border border-warm-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{produto.name}</h5>
                      <p className="text-sm text-gray-600">{produto.description}</p>
                      <span className="text-primary-600 font-semibold">
                        R$ {produto.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <QuantitySelector
                      quantity={quantity}
                      onQuantityChange={(qty) => handleQuantityChange(produto.id, qty)}
                      min={0}
                      max={5}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Refrigerantes */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Refrigerantes</h4>
            {adicionais.filter(p => p.type === 'refrigerante').map((produto) => {
              const quantity = selections[produto.id] || 0;
              
              return (
                <div key={produto.id} className="bg-white border border-warm-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{produto.name}</h5>
                      <p className="text-sm text-gray-600">{produto.description}</p>
                      <span className="text-primary-600 font-semibold">
                        R$ {produto.price.toFixed(2).replace('.', ',')}
                      </span>
                      {produto.stock === 'poucos-restantes' && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full ml-2">
                          Poucos restantes
                        </span>
                      )}
                    </div>
                    <QuantitySelector
                      quantity={quantity}
                      onQuantityChange={(qty) => handleQuantityChange(produto.id, qty)}
                      min={0}
                      max={5}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {hasSelections && (
            <div className="bg-white border border-warm-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Total adicionais:</span>
                <span className="text-xl font-bold text-primary-600">
                  R$ {getTotalPrice().toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          )}
          
          <button
            onClick={handleFinish}
            className="w-full bg-primary-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>{hasSelections ? 'Adicionar tudo ao carrinho' : 'Finalizar sem adicionais'}</span>
          </button>
          
          {hasSelections && (
            <button
              onClick={handleSkip}
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Pular adicionais
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
