import React, { useState } from 'react';
import { MapPin, Flame, CakeSlice, Coffee, Copy } from 'lucide-react';
import { AppConfig } from '../../config';

interface HomeViewProps {
  onNavigateToOrderSelection: () => void;
  onNavigateToCakes: () => void;
  onNavigateToReservation: () => void;
}

export function HomeView({ onNavigateToOrderSelection, onNavigateToCakes, onNavigateToReservation }: HomeViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(AppConfig.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="p-4 space-y-6">
        {/* Hero Section */}
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vindo à Panificadora que Delícia!
          </h2>
          <p className="text-lg font-semibold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
            Faça seu pedido!
          </p>
        </div>

        {/* Main CTAs */}
        <div className="space-y-4">
          <button
            onClick={onNavigateToOrderSelection}
            className="w-full bg-white border-2 border-primary-200 rounded-xl p-6 text-left hover:border-primary-300 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">Churrasco de Domingo</h3>
                <p className="text-gray-600 text-sm">Frangos, carnes e kits para retirada</p>
                <p className="text-primary-600 text-sm font-medium mt-1">Aberto aos Domingos 08:00-10:00</p>
              </div>
            </div>
          </button>

          <button
            onClick={onNavigateToCakes}
            className="w-full bg-white border-2 border-pink-200 rounded-xl p-6 text-left hover:border-pink-300 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <CakeSlice className="w-6 h-6 text-pink-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">Bolos e Doces</h3>
                <p className="text-gray-600 text-sm">Encomende nossas sobremesas artesanais</p>
              </div>
            </div>
          </button>

          <button
            onClick={onNavigateToReservation}
            className="w-full bg-white border-2 border-blue-200 rounded-xl p-6 text-left hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Coffee className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">Reserva Cafés</h3>
                <p className="text-gray-600 text-sm">Agende seu café da manhã ou da tarde</p>
              </div>
            </div>
          </button>
        </div>

        {/* Location Info */}
        <div className="bg-warm-50 border border-warm-200 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <MapPin className="w-5 h-5 text-primary-600" />
            <h3 className="font-semibold text-gray-900">Nosso Endereço</h3>
          </div>
          <p className="text-gray-600 text-sm mb-3">
            {AppConfig.address}
          </p>
          <div className="flex space-x-2">
            <a 
              href={AppConfig.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors text-center"
            >
              Ver mapa
            </a>
            <button 
              onClick={handleCopyAddress}
              className="flex-1 border border-primary-600 text-primary-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary-50 transition-colors flex items-center justify-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
