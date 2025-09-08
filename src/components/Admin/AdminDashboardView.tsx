import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingBag, CalendarClock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { format, subDays } from 'date-fns';

export function AdminDashboardView() {
  const { state } = useApp();

  const totalRevenue = state.orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = state.orders.length;
  const totalReservations = state.reservations.length;

  const getSalesData = () => {
    const salesByDay: { [key: string]: number } = {};
    for (let i = 6; i >= 0; i--) {
      const date = format(subDays(new Date(), i), 'dd/MM');
      salesByDay[date] = 0;
    }

    state.orders.forEach(order => {
      const date = format(order.createdAt, 'dd/MM');
      if (salesByDay[date] !== undefined) {
        salesByDay[date] += order.total;
      }
    });
    
    return Object.keys(salesByDay).map(date => ({
      name: date,
      Vendas: salesByDay[date]
    }));
  };

  const salesData = getSalesData();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"><DollarSign className="w-6 h-6 text-green-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Receita Total</p>
              <p className="text-2xl font-bold text-gray-800">R$ {totalRevenue.toFixed(2).replace('.', ',')}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><ShoppingBag className="w-6 h-6 text-blue-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Total de Pedidos</p>
              <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center"><CalendarClock className="w-6 h-6 text-yellow-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Total de Reservas</p>
              <p className="text-2xl font-bold text-gray-800">{totalReservations}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Vendas nos Últimos 7 Dias</h2>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={salesData}
              margin={{
                top: 5,
                right: 20,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `R$${value}`} />
              <Tooltip formatter={(value: number) => [`R$ ${value.toFixed(2).replace('.', ',')}`, "Vendas"]} />
              <Legend />
              <Bar dataKey="Vendas" fill="#d69e2e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
