import React, { useState } from 'react';
import { ArrowLeft, Clock, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateTimeSlots, isSlotAvailable } from '../../data/timeSlots';
import { AppConfig } from '../../config';

interface SchedulingViewProps {
  onBack: () => void;
  onContinueToPayment: () => void;
}

export function SchedulingView({ onBack, onContinueToPayment }: SchedulingViewProps) {
  const { state, dispatch } = useApp();
  const [selectedTime, setSelectedTime] = useState<string | null>(state.selectedPickupTime);
  
  const timeSlots = generateTimeSlots();
  const total = state.cart.reduce((sum, item) => sum + item.subtotal, 0);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    dispatch({ type: 'SET_PICKUP_TIME', payload: time });
  };

  const handleContinue = () => {
    if (selectedTime) {
      onContinueToPayment();
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="sticky top-0 bg-white border-b border-warm-200 z-10">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-2">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">Agendar Retirada</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Escolha um horário de retirada
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Horário de funcionamento</h3>
          </div>
          <p className="text-blue-700 text-sm">
            Pedidos para retirada apenas aos domingos, das 08:00 às 10:00.
          </p>
        </div>

        {/* Current Date */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Domingo - {new Date().toLocaleDateString('pt-BR')}
          </h3>
          <p className="text-sm text-gray-600">
            Selecione um intervalo de 10 minutos
          </p>
        </div>

        {/* Time Slots */}
        <div className="grid grid-cols-2 gap-3">
          {timeSlots.map((slot) => {
            const available = isSlotAvailable(slot);
            const isSelected = selectedTime === slot.time;
            
            return (
              <button
                key={slot.time}
                onClick={() => available && handleTimeSelect(slot.time)}
                disabled={!available}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : available
                    ? 'border-warm-200 bg-white hover:border-primary-300 hover:bg-primary-25'
                    : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold text-lg">{slot.time}</div>
                  <div className="text-xs mt-1">
                    {available 
                      ? `${slot.capacity - slot.booked} vagas`
                      : 'Lotado'
                    }
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Time Confirmation */}
        {selectedTime && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-900">Horário selecionado</h3>
            </div>
            <p className="text-green-700">
              Sua retirada está agendada para <strong>{selectedTime}</strong>
            </p>
          </div>
        )}

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-900">Importante</h3>
          </div>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>• Chegue no horário agendado</li>
            <li>• Dirija-se ao balcão "Pedidos Online"</li>
            <li>• Tenha o QR code ou documento em mãos</li>
            <li>• Seu pedido ficará reservado por 15 minutos</li>
          </ul>
        </div>
      </div>

      {/* Fixed Bottom */}
      {selectedTime && (
        <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-warm-200 p-4 z-30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm text-gray-600">Retirada às {selectedTime}</span>
              <div className="text-lg font-semibold text-gray-900">
                Total: R$ {total.toFixed(2).replace('.', ',')}
              </div>
            </div>
          </div>
          
          <button
            onClick={handleContinue}
            className="w-full bg-primary-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            Continuar para pagamento
          </button>
        </div>
      )}
    </div>
  );
}
