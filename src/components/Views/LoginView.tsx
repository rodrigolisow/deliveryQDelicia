import React from 'react';
import { LogIn, ChefHat } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export function LoginView({ onLoginSuccess }: LoginViewProps) {
  const { dispatch } = useApp();

  const handleGoogleLogin = () => {
    // Simulate Google login
    const mockUser: User = {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 99999-9999',
      orders: []
    };

    dispatch({ type: 'SET_USER', payload: mockUser });
    onLoginSuccess();
  };

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="min-h-full flex flex-col justify-center px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChefHat className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Panificadora que delicia!
          </h1>
          <p className="text-gray-600">
            Seu churrasco pronto para retirar — rápido, fresquinho e do seu jeito.
          </p>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Entre para fazer seu pedido
            </h2>
            <p className="text-gray-600 text-sm">
              Acesse sua conta para agendar retirada e acompanhar pedidos
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-3"
          >
            <LogIn className="w-6 h-6 text-primary-600" />
            <span>Entrar com Google</span>
          </button>

          <div className="bg-warm-50 border border-warm-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Você pode navegar sem login:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Ver o cardápio completo</li>
              <li>• Montar seu pedido</li>
              <li>• Calcular preços</li>
            </ul>
            <p className="text-xs text-gray-500 mt-2">
              Login necessário apenas no checkout
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Ao fazer login, você concorda com nossos{' '}
              <a href="#" className="text-primary-600 underline">Termos de Uso</a> e{' '}
              <a href="#" className="text-primary-600 underline">Política de Privacidade</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
