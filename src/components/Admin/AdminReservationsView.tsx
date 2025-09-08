import React from 'react';
import { useApp } from '../../context/AppContext';
import { format } from 'date-fns';
import { Reservation } from '../../types';

export function AdminReservationsView() {
  const { state, dispatch } = useApp();

  const handleStatusChange = (id: string, status: Reservation['status']) => {
    dispatch({ type: 'UPDATE_RESERVATION_STATUS', payload: { id, status } });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed': return <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">Confirmada</span>;
      case 'pending': return <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">Pendente</span>;
      case 'cancelled': return <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">Cancelada</span>;
      default: return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Gerenciar Reservas</h1>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">ID Reserva</th>
              <th scope="col" className="px-6 py-3">Cliente</th>
              <th scope="col" className="px-6 py-3">Data</th>
              <th scope="col" className="px-6 py-3">Horário</th>
              <th scope="col" className="px-6 py-3">Pessoas</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {state.reservations.slice().reverse().map(res => (
              <tr key={res.id} className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{res.id}</th>
                <td className="px-6 py-4">{res.name}</td>
                <td className="px-6 py-4">{format(new Date(res.date), 'dd/MM/yyyy')}</td>
                <td className="px-6 py-4">{res.time}</td>
                <td className="px-6 py-4">{res.guests}</td>
                <td className="px-6 py-4">{getStatusBadge(res.status)}</td>
                <td className="px-6 py-4">
                  <select
                    value={res.status}
                    onChange={(e) => handleStatusChange(res.id, e.target.value as Reservation['status'])}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  >
                    <option value="pending">Pendente</option>
                    <option value="confirmed">Confirmar</option>
                    <option value="cancelled">Cancelar</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
