import React from 'react';
import { useApp } from '../../context/AppContext';
import { format } from 'date-fns';

export function AdminOrdersView() {
  const { state } = useApp();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">Completo</span>;
      case 'ready': return <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">Pronto</span>;
      case 'preparing': return <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">Em Preparo</span>;
      case 'paid': return <span className="px-2 py-1 text-xs font-medium text-purple-800 bg-purple-100 rounded-full">Pago</span>;
      default: return <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">Pendente</span>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Gerenciar Pedidos</h1>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">ID Pedido</th>
              <th scope="col" className="px-6 py-3">Cliente</th>
              <th scope="col" className="px-6 py-3">Data</th>
              <th scope="col" className="px-6 py-3">Retirada</th>
              <th scope="col" className="px-6 py-3">Valor</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {state.orders.slice().reverse().map(order => (
              <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{order.id}</th>
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4">{format(order.createdAt, 'dd/MM/yyyy')}</td>
                <td className="px-6 py-4">{order.pickupTime}</td>
                <td className="px-6 py-4">R$ {order.total.toFixed(2).replace('.', ',')}</td>
                <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
