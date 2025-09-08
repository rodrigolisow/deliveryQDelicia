import React from 'react';
import { ArrowLeft, ChefHat, Flame, Package } from 'lucide-react';

interface OrderSelectionViewProps {
  onNavigate: (view: 'frango' | 'churrasco' | 'kit') => void;
  onBack: () => void;
}

export function OrderSelectionView({ onNavigate, onBack }: OrderSelectionViewProps) {
  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="sticky top-0 bg-white border-b border-warm-200 z-10">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-2">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">Churrasco de Domingo</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Escolha entre frango, cortes de churrasco ou monte um kit completo.
          </p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <button
          onClick={() => onNavigate('frango')}
          className="w-full bg-white border-2 border-primary-200 rounded-xl p-6 text-left hover:border-primary-300 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">Frango Assado</h3>
              <p className="text-gray-600 text-sm">Com ou sem recheio, quentinho e no ponto</p>
              <p className="text-primary-600 text-sm font-medium mt-1">A partir de R$ 22,90</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('churrasco')}
          className="w-full bg-white border-2 border-primary-200 rounded-xl p-6 text-left hover:border-primary-300 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <Flame className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">Churrascos</h3>
              <p className="text-gray-600 text-sm">Cortes selecionados para o seu churrasco</p>
              <p className="text-primary-600 text-sm font-medium mt-1">A partir de R$ 35,90/kg</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('kit')}
          className="w-full bg-primary-50 border-2 border-primary-300 rounded-xl p-6 text-left hover:bg-primary-100 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-200 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-primary-700" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-primary-800">Montar Kit</h3>
              <p className="text-primary-700 text-sm">Combine Frango + Churrasco + Adicionais</p>
              <p className="text-primary-600 text-sm font-medium mt-1">🔥 Mais popular</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
