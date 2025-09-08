import React from 'react';
import { Check, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ReservationConfirmationViewProps {
  onBackToHome: () => void;
}

export function ReservationConfirmationView({ onBackToHome }: ReservationConfirmationViewProps) {
  const { state } = useApp();
  const reservation = state.latestReservation;

  if (!reservation) {
    return (
      <div className="flex-1 flex items-center justify-center text-center p-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">Nenhuma reserva encontrada.</h2>
          <button
            onClick={onBackToHome}
            className="bg-primary-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="p-4 space-y-6">
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Solicitação Enviada!
          </h2>
          <p className="text-gray-600">
            Recebemos sua solicitação de reserva. Entraremos em contato em breve para confirmar.
          </p>
        </div>

        <div className="bg-white border border-warm-200 rounded-xl p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-4">Detalhes da Solicitação</h3>
          <div className="space-y-3 text-left">
            <p><strong>Código:</strong> {reservation.id}</p>
            <p><strong>Nome:</strong> {reservation.name}</p>
            <p><strong>Data:</strong> {new Date(reservation.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</p>
            <p><strong>Horário:</strong> {reservation.time}</p>
            <p><strong>Pessoas:</strong> {reservation.guests}</p>
            <p><strong>Tipo:</strong> {reservation.type === 'familiar' ? 'Familiar' : 'Corporativo'}</p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Mail className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Fique de olho no seu e-mail</h3>
          </div>
          <p className="text-green-700 text-sm">
            Enviaremos a confirmação final da sua reserva para <strong>{reservation.email}</strong>.
          </p>
        </div>

        <button
          onClick={onBackToHome}
          className="w-full bg-primary-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
}
