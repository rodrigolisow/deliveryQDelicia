import React from 'react';
import { ArrowLeft, Trash2, ShoppingCart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { QuantitySelector } from '../Common/QuantitySelector';

interface CartViewProps {
  onBack: () => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export function CartView({ onBack, onCheckout, onContinueShopping }: CartViewProps) {
  const { state, dispatch } = useApp();

  const total = state.cart.reduce((sum, item) => sum + item.subtotal, 0);
  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_CART_ITEM',
      payload: { id: itemId, quantity }
    });
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: itemId
    });
  };

  const groupedItems = state.cart.reduce((acc, item) => {
    const category = item.product.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof state.cart>);

  if (state.cart.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="sticky top-0 bg-white border-b border-warm-200 z-10">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-2">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold text-gray-900">Carrinho</h2>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Seu carrinho está vazio</h3>
            <p className="text-gray-600 mb-6">Que tal começar por um frango assado quentinho?</p>
            <button
              onClick={onContinueShopping}
              className="bg-primary-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              Ver cardápio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="sticky top-0 bg-white border-b border-warm-200 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold text-gray-900">Carrinho</h2>
            </div>
            <span className="text-sm text-gray-600">{itemCount} {itemCount === 1 ? 'item' : 'itens'}</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Grouped Items */}
        {Object.entries(groupedItems).map(([category, items]) => {
          const categoryNames = {
            frango: 'Frangos',
            churrasco: 'Churrascos',
            adicional: 'Adicionais'
          };

          return (
            <div key={category} className="space-y-3">
              <h3 className="font-semibold text-gray-900 text-lg">
                {categoryNames[category as keyof typeof categoryNames]}
              </h3>
              
              {items.map((item) => (
                <div key={item.id} className="bg-white border border-warm-200 rounded-xl p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-warm-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.product.image && (
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900">{item.product.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{item.product.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-primary-600 font-semibold">
                            R$ {item.product.price.toFixed(2).replace('.', ',')}
                          </span>
                          <QuantitySelector
                            quantity={item.quantity}
                            onQuantityChange={(qty) => handleUpdateQuantity(item.id, qty)}
                            min={0}
                            max={10}
                            size="sm"
                          />
                        </div>
                        
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="mt-2 text-right">
                        <span className="text-sm text-gray-600">Subtotal: </span>
                        <span className="font-semibold text-gray-900">
                          R$ {item.subtotal.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        {/* Continue Shopping */}
        <button
          onClick={onContinueShopping}
          className="w-full border border-primary-600 text-primary-600 py-3 px-6 rounded-xl font-medium hover:bg-primary-50 transition-colors"
        >
          Continuar escolhendo
        </button>
      </div>

      {/* Fixed Bottom Summary */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-warm-200 p-4 z-30">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-900">Total:</span>
          <span className="text-2xl font-bold text-primary-600">
            R$ {total.toFixed(2).replace('.', ',')}
          </span>
        </div>
        
        <button
          onClick={onCheckout}
          disabled={!state.isOpen}
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-colors ${
            state.isOpen
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {state.isOpen ? 'Agendar retirada' : 'Fechado - Aberto dom 08:00-10:00'}
        </button>
      </div>
    </div>
  );
}
