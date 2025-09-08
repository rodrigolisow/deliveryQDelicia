import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  context: 'churrasco' | 'default';
}

export function Header({ context }: HeaderProps) {
  const { state } = useApp();

  return (
    <header className="bg-white shadow-sm border-b border-warm-200 sticky top-0 z-40">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="font-bold text-xl text-gray-900">Q Delicia</h1>
          </div>
          
          {context === 'churrasco' ? (
            <div className="text-right">
              <div className="flex items-center justify-end space-x-1 mb-1">
                <Clock className="w-4 h-4 text-primary-600" />
                <span className={`text-sm font-medium ${state.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                  {state.isOpen ? 'Aberto' : 'Fechado'}
                </span>
              </div>
              <div className="flex items-center justify-end space-x-1">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">Dom 08:00-10:00</span>
              </div>
            </div>
          ) : (
            <div className="text-right">
              <p className="font-semibold text-primary-600">Sua casa Gourmet</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
