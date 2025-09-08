import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminDashboardView } from './AdminDashboardView';
import { AdminOrdersView } from './AdminOrdersView';
import { AdminReservationsView } from './AdminReservationsView';

type AdminView = 'dashboard' | 'orders' | 'reservations';

interface AdminLayoutProps {
  onExit: () => void;
}

export function AdminLayout({ onExit }: AdminLayoutProps) {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <AdminDashboardView />;
      case 'orders': return <AdminOrdersView />;
      case 'reservations': return <AdminReservationsView />;
      default: return <AdminDashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        onExit={onExit} 
      />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}
