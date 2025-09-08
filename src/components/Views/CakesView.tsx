import React, { useState } from 'react';
import { ArrowLeft, Plus, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { getProductsByCategory } from '../../data/products';
import { ProductCard } from '../Common/ProductCard';
import { Product } from '../../types';

interface CakesViewProps {
  onBack: () => void;
  onViewCart: () => void;
}

export function CakesView({ onBack }: CakesViewProps) {
  const { dispatch } = useApp();
  const [addedProduct, setAddedProduct] = useState<Product | null>(null);
  const cakesAndSweets = getProductsByCategory('bolo-doce');

  const handleAddToCart = (product: Product) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity: 1 }
    });
    setAddedProduct(product);
    setTimeout(() => setAddedProduct(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="sticky top-0 bg-white border-b border-warm-200 z-10">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-2">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">Bolos e Doces</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Escolha nossas delícias artesanais para sua festa ou sobremesa.
          </p>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cakesAndSweets.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              onAdd={handleAddToCart}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {addedProduct && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 w-max max-w-sm bg-green-600 text-white py-3 px-5 rounded-full shadow-lg flex items-center space-x-3 z-50"
          >
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold">{addedProduct.name} adicionado ao carrinho!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
