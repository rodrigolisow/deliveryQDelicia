import React, { useState } from 'react';
import { ArrowLeft, User, Calendar, Clock, Users, Briefcase, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Reservation } from '../../types';

interface ReservationViewProps {
  onBack: () => void;
  onReservationSuccess: () => void;
}

export function ReservationView({ onBack, onReservationSuccess }: ReservationViewProps) {
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    phone: state.user?.phone || '',
    email: state.user?.email || '',
    date: '',
    time: '',
    guests: 2,
    type: 'familiar' as 'familiar' | 'corporativo',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newReservation: Reservation = {
        id: `RES-${Date.now().toString().slice(-6)}`,
        ...formData,
        guests: Number(formData.guests),
        status: 'pending',
        createdAt: new Date(),
      };
      
      dispatch({ type: 'ADD_RESERVATION', payload: newReservation });
      setIsSubmitting(false);
      onReservationSuccess();
    }, 1500);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="sticky top-0 bg-white border-b border-warm-200 z-10">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-2">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">Reserva de Café</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Reserve uma mesa para seu café corporativo ou familiar.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="bg-white border border-warm-200 rounded-xl p-4 space-y-4">
          <h3 className="font-semibold text-lg text-gray-900">Seus Dados</h3>
          <div className="relative">
            <label htmlFor="name" className="text-xs font-medium text-gray-500">Nome</label>
            <User className="absolute left-3 top-1/2 -translate-y-1/3 w-5 h-5 text-gray-400" />
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="relative">
            <label htmlFor="phone" className="text-xs font-medium text-gray-500">Telefone</label>
            <User className="absolute left-3 top-1/2 -translate-y-1/3 w-5 h-5 text-gray-400" />
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="relative">
            <label htmlFor="email" className="text-xs font-medium text-gray-500">Email</label>
            <User className="absolute left-3 top-1/2 -translate-y-1/3 w-5 h-5 text-gray-400" />
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md" />
          </div>
        </div>

        <div className="bg-white border border-warm-200 rounded-xl p-4 space-y-4">
          <h3 className="font-semibold text-lg text-gray-900">Detalhes da Reserva</h3>
          <div className="flex space-x-4">
            <div className="relative w-1/2">
              <label htmlFor="date" className="text-xs font-medium text-gray-500">Data</label>
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/3 w-5 h-5 text-gray-400" />
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="relative w-1/2">
              <label htmlFor="time" className="text-xs font-medium text-gray-500">Horário</label>
              <Clock className="absolute left-3 top-1/2 -translate-y-1/3 w-5 h-5 text-gray-400" />
              <input type="time" name="time" value={formData.time} onChange={handleInputChange} required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="guests" className="text-xs font-medium text-gray-500">Número de Pessoas</label>
            <Users className="absolute left-3 top-1/2 -translate-y-1/3 w-5 h-5 text-gray-400" />
            <input type="number" name="guests" value={formData.guests} onChange={handleInputChange} min="1" max="20" required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Tipo de Reserva</label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setFormData(p => ({...p, type: 'familiar'}))} className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center space-y-2 ${formData.type === 'familiar' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}>
                <Heart className={`w-6 h-6 ${formData.type === 'familiar' ? 'text-blue-600' : 'text-gray-500'}`} />
                <span className="font-semibold">Familiar</span>
              </button>
              <button type="button" onClick={() => setFormData(p => ({...p, type: 'corporativo'}))} className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center space-y-2 ${formData.type === 'corporativo' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}>
                <Briefcase className={`w-6 h-6 ${formData.type === 'corporativo' ? 'text-blue-600' : 'text-gray-500'}`} />
                <span className="font-semibold">Corporativo</span>
              </button>
            </div>
          </div>
        </div>
        
        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300">
          {isSubmitting ? 'Enviando...' : 'Enviar Solicitação de Reserva'}
        </button>
      </form>
    </div>
  );
}
