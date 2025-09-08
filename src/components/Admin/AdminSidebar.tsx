import React from 'react';
import { LayoutDashboard, ShoppingBag, CalendarClock, LogOut } from 'lucide-react';

type AdminView = 'dashboard' | 'orders' | 'reservations';

interface AdminSidebarProps {
  currentView: AdminView;
  onViewChange: (view: AdminView) => void;
  onExit: () => void;
}

export function AdminSidebar({ currentView, onViewChange, onExit }: AdminSidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Pedidos', icon: ShoppingBag },
    { id: 'reservations', label: 'Reservas', icon: CalendarClock },
  ];

  return (
    <aside className="w-64 bg-warm-900 text-warm-200 flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white">Painel Admin</h2>
        <p className="text-sm text-warm-400">Q Delicia</p>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as AdminView)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === item.id
                ? 'bg-primary-500 text-white font-semibold'
                : 'hover:bg-warm-800'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-warm-800">
        <button
          onClick={onExit}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-warm-800 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Voltar ao App</span>
        </button>
      </div>
    </aside>
  );
}
