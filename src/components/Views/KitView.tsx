import React, { useState } from 'react';
import { ArrowLeft, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { getProductsByCategory, getProductById } from '../../data/products';
import { ProductCard } from '../Common/ProductCard';
import { QuantitySelector } from '../Common/QuantitySelector';
import { Product } from '../../types';

interface KitViewProps {
  onBack: () => void;
  onFinish: () => void;
}

const steps = ['Frango', 'Churrasco', 'Adicionais'];

export function KitView({ onBack, onFinish }: KitViewProps) {
  const { dispatch } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  const [frangoSelection, setFrangoSelection] = useState<{ product: Product; quantity: number } | null>(null);
  const [churrascoSelections, setChurrascoSelections] = useState<Record<string, number>>({});
  const [adicionaisSelections, setAdicionaisSelections] = useState<Record<string, number>>({});
  
  const frangos = getProductsByCategory('frango');
  const churrascos = getProductsByCategory('churrasco').filter(p => p.available);
  const adicionais = getProductsByCategory('adicional').filter(p => p.available);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleAddKitToCart = () => {
    const allSelections: { product: Product; quantity: number }[] = [];

    if (frangoSelection) {
      allSelections.push(frangoSelection);
    }

    Object.entries(churrascoSelections).forEach(([productId, quantity]) => {
      if (quantity > 0) {
        const product = getProductById(productId);
        if (product) {
          allSelections.push({ product, quantity });
        }
      }
    });

    Object.entries(adicionaisSelections).forEach(([productId, quantity]) => {
      if (quantity > 0) {
        const product = getProductById(productId);
        if (product) {
          allSelections.push({ product, quantity });
        }
      }
    });

    allSelections.forEach(selection => {
      dispatch({ type: 'ADD_TO_CART', payload: selection });
    });

    onFinish();
  };

  const getTotalPrice = () => {
    let total = 0;
    if (frangoSelection) {
      total += frangoSelection.product.price * frangoSelection.quantity;
    }
    total += Object.entries(churrascoSelections).reduce((sum, [id, qty]) => sum + (getProductById(id)?.price || 0) * qty, 0);
    total += Object.entries(adicionaisSelections).reduce((sum, [id, qty]) => sum + (getProductById(id)?.price || 0) * qty, 0);
    return total;
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Frango
        return (
          <motion.div key="frango" initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }} transition={{ duration: 0.3 }}>
            <h3 className="font-semibold text-gray-900 text-lg mb-4">Etapa 1: Escolha o Frango</h3>
            <div className="space-y-4">
              {frangos.map(frango => (
                <div key={frango.id} className={`border-2 rounded-xl transition-colors cursor-pointer ${frangoSelection?.product.id === frango.id ? 'border-primary-300 bg-primary-50' : 'border-warm-200 bg-white'}`} onClick={() => setFrangoSelection({ product: frango, quantity: frangoSelection?.product.id === frango.id ? frangoSelection.quantity : 1 })}>
                  <ProductCard product={frango} onAdd={() => {}} showAddButton={false} />
                  {frangoSelection?.product.id === frango.id && (
                    <div className="p-4 border-t border-primary-200 bg-primary-25 flex items-center justify-between">
                      <span className="text-primary-600 font-medium text-sm">✓ Selecionado</span>
                      <QuantitySelector quantity={frangoSelection.quantity} onQuantityChange={(q) => setFrangoSelection({ product: frango, quantity: q })} min={1} max={5} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button onClick={handleNext} className="mt-6 w-full bg-primary-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors">Próximo</button>
          </motion.div>
        );
      case 1: // Churrasco
        return (
          <motion.div key="churrasco" initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }} transition={{ duration: 0.3 }}>
            <h3 className="font-semibold text-gray-900 text-lg mb-4">Etapa 2: Escolha os Churrascos (opcional)</h3>
            <div className="space-y-3">
              {churrascos.map(churrasco => (
                <div key={churrasco.id} className={`bg-white rounded-xl border-2 p-4 ${churrascoSelections[churrasco.id] > 0 ? 'border-primary-300' : 'border-warm-200'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{churrasco.name}</h4>
                      <p className="text-sm text-gray-500">R$ {churrasco.price.toFixed(2).replace('.', ',')} /{churrasco.unit}</p>
                    </div>
                    <QuantitySelector quantity={churrascoSelections[churrasco.id] || 0} onQuantityChange={qty => setChurrascoSelections(prev => ({ ...prev, [churrasco.id]: qty }))} min={0} />
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleNext} className="mt-6 w-full bg-primary-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors">Próximo</button>
          </motion.div>
        );
      case 2: // Adicionais
        const kitTotal = getTotalPrice();
        return (
          <motion.div key="adicionais" initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }} transition={{ duration: 0.3 }}>
            <h3 className="font-semibold text-gray-900 text-lg mb-4">Etapa 3: Complemente seu Kit (opcional)</h3>
            <div className="space-y-3">
              {adicionais.map(adicional => (
                <div key={adicional.id} className={`bg-white rounded-xl border-2 p-4 ${adicionaisSelections[adicional.id] > 0 ? 'border-primary-300' : 'border-warm-200'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{adicional.name}</h4>
                      <p className="text-sm text-gray-500">R$ {adicional.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <QuantitySelector quantity={adicionaisSelections[adicional.id] || 0} onQuantityChange={qty => setAdicionaisSelections(prev => ({ ...prev, [adicional.id]: qty }))} min={0} />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-white border border-warm-200 rounded-xl p-4">
              <h3 className="font-bold text-lg mb-4">Resumo do Kit</h3>
              <div className="space-y-2 text-sm">
                {frangoSelection && (
                  <div className="flex justify-between"><span>{frangoSelection.quantity}x {frangoSelection.product.name}</span> <span>R$ {(frangoSelection.quantity * frangoSelection.product.price).toFixed(2).replace('.', ',')}</span></div>
                )}
                {Object.entries(churrascoSelections).map(([id, qty]) => {
                  if (qty === 0) return null;
                  const p = getProductById(id);
                  return p && <div key={id} className="flex justify-between"><span>{qty}x {p.name}</span> <span>R$ {(qty * p.price).toFixed(2).replace('.', ',')}</span></div>
                })}
                {Object.entries(adicionaisSelections).map(([id, qty]) => {
                  if (qty === 0) return null;
                  const p = getProductById(id);
                  return p && <div key={id} className="flex justify-between"><span>{qty}x {p.name}</span> <span>R$ {(qty * p.price).toFixed(2).replace('.', ',')}</span></div>
                })}
              </div>
              <div className="border-t border-warm-200 mt-3 pt-3 flex justify-between items-center">
                <span className="font-semibold text-lg">Total do Kit:</span>
                <span className="font-bold text-xl text-primary-600">R$ {kitTotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <button onClick={handleAddKitToCart} disabled={kitTotal === 0} className="mt-6 w-full bg-primary-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-300 flex items-center justify-center space-x-2">
              <Plus />
              <span>Adicionar Kit ao Carrinho</span>
            </button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="sticky top-0 bg-white border-b border-warm-200 z-10">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-2">
            <button onClick={handlePrev} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">Montar Kit</h2>
          </div>
          {/* Stepper */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            {steps.map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= index ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {currentStep > index ? <Check size={16}/> : index + 1}
                  </div>
                  <span className={`font-medium ${currentStep >= index ? 'text-primary-700' : 'text-gray-500'}`}>{step}</span>
                </div>
                {index < steps.length - 1 && <div className="flex-1 h-0.5 bg-gray-200" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4">
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>
      </div>
    </div>
  );
}
