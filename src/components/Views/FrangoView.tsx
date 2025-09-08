import React, { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getProductsByCategory } from '../../data/products';
import { ProductCard } from '../Common/ProductCard';
import { QuantitySelector } from '../Common/QuantitySelector';
import { Product } from '../../types';

interface FrangoViewProps {
  onBack: () => void;
  onNavigateToAdicionais: (mainProducts: Array<{product: Product, quantity: number}>) => void;
}

export function FrangoView({ onBack, onNavigateToAdicionais }: FrangoViewProps) {
  const { dispatch } = useApp();
  const [selectedFrango, setSelectedFrango] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const frangos = getProductsByCategory('frango');

  const handleAddToCart = () => {
    if (selectedFrango) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { product: selectedFrango, quantity }
      });
      
      // Navigate to adicionais
      onNavigateToAdicionais([{ product: selectedFrango, quantity }]);
    }
  };

  const handleSelectFrango = (product: Product) => {
    setSelectedFrango(product);
    setQuantity(1);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="sticky top-0 bg-white border-b border-warm-200 z-10">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-2">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">Frango Assado</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Escolha seu frango e adicione a quantidade desejada
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Frango Selection */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Escolha o tipo:</h3>
          <div className="grid gap-4">
            {frangos.map((frango) => (
              <div
                key={frango.id}
                className={`border-2 rounded-xl transition-colors cursor-pointer ${
                  selectedFrango?.id === frango.id
                    ? 'border-primary-300 bg-primary-50'
                    : 'border-warm-200 bg-white'
                }`}
                onClick={() => handleSelectFrango(frango)}
              >
                <ProductCard 
                  product={frango} 
                  onAdd={() => handleSelectFrango(frango)}
                  showAddButton={false}
                />
                {selectedFrango?.id === frango.id && (
                  <div className="p-4 border-t border-primary-200 bg-primary-25">
                    <span className="text-primary-600 font-medium text-sm">✓ Selecionado</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quantity Selection */}
        {selectedFrango && (
          <div className="bg-white border border-warm-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">Quantidade</h4>
                <p className="text-sm text-gray-600">
                  Cada frango serve {selectedFrango.serves} pessoas
                </p>
              </div>
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
                min={1}
                max={5}
                size="lg"
              />
            </div>
            
            <div className="border-t border-warm-200 pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-xl font-bold text-primary-600">
                  R$ {(selectedFrango.price * quantity).toFixed(2).replace('.', ',')}
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
          </div>
        )}

        {/* Info */}
        <div className="bg-warm-50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Sobre nossos frangos:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Temperados com especiarias selecionadas</li>
            <li>• Assados no ponto ideal</li>
            <li>• Servidos quentinhos</li>
            <li>• Ideal para famílias</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
