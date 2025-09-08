import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Layout/Header';
import { BottomNav } from './components/Layout/BottomNav';
import { CartPreview } from './components/Layout/CartPreview';
import { HomeView } from './components/Views/HomeView';
import { OrderSelectionView } from './components/Views/OrderSelectionView';
import { FrangoView } from './components/Views/FrangoView';
import { ChurrascoView } from './components/Views/ChurrascoView';
import { KitView } from './components/Views/KitView';
import { AdicionaisView } from './components/Views/AdicionaisView';
import { CartView } from './components/Views/CartView';
import { SchedulingView } from './components/Views/SchedulingView';
import { PaymentView } from './components/Views/PaymentView';
import { ConfirmationView } from './components/Views/ConfirmationView';
import { LoginView } from './components/Views/LoginView';
import { CakesView } from './components/Views/CakesView';
import { ReservationView } from './components/Views/ReservationView';
import { ReservationConfirmationView } from './components/Views/ReservationConfirmationView';
import { AdminLayout } from './components/Admin/AdminLayout';
import { Product } from './types';
import { ShieldCheck } from 'lucide-react';

type View = 
  | 'home' 
  | 'orderSelection' 
  | 'frango' 
  | 'churrasco' 
  | 'kit' 
  | 'adicionais' 
  | 'cart' 
  | 'scheduling' 
  | 'payment' 
  | 'confirmation' 
  | 'login' 
  | 'account'
  | 'cakes'
  | 'reservation'
  | 'reservationConfirmation'
  | 'admin';

type HeaderContext = 'churrasco' | 'default';

function AppContent() {
  const { state, dispatch } = useApp();
  const [currentView, setCurrentView] = useState<View>('home');
  const [mainProducts, setMainProducts] = useState<Array<{product: Product, quantity: number}>>([]);
  const [viewAfterLogin, setViewAfterLogin] = useState<View | null>(null);

  // Check if store is open every minute
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const isOpen = day === 0 && hour >= 8 && hour < 10;
      
      dispatch({ type: 'SET_IS_OPEN', payload: isOpen });
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleNavigateToOrderSelection = () => setCurrentView('orderSelection');
  const handleNavigateToCakes = () => setCurrentView('cakes');
  const handleNavigateToReservation = () => setCurrentView('reservation');

  const handleNavigateToProduct = (view: 'frango' | 'churrasco' | 'kit') => {
    setCurrentView(view);
  };

  const handleNavigateToAdicionais = (products: Array<{product: Product, quantity: number}>) => {
    setMainProducts(products);
    setCurrentView('adicionais');
  };

  const handleBottomNavChange = (view: 'home' | 'cart' | 'account') => {
    if (view === 'account' && !state.user) {
      setViewAfterLogin('account');
      setCurrentView('login');
    } else {
      setCurrentView(view);
    }
  };

  const handleCheckout = () => {
    if (!state.user) {
      setViewAfterLogin('scheduling');
      setCurrentView('login');
    } else {
      setCurrentView('scheduling');
    }
  };

  const handleLoginSuccess = () => {
    if (viewAfterLogin) {
      setCurrentView(viewAfterLogin);
      setViewAfterLogin(null);
    } else if (state.cart.length > 0) {
      setCurrentView('cart');
    } else {
      setCurrentView('home');
    }
  };

  const getHeaderContext = (view: View): HeaderContext => {
    const churrascoViews: View[] = [
      'orderSelection',
      'frango',
      'churrasco',
      'kit',
      'adicionais',
      'scheduling',
      'payment',
      'confirmation'
    ];
    return churrascoViews.includes(view) ? 'churrasco' : 'default';
  };

  if (currentView === 'admin') {
    return <AdminLayout onExit={() => setCurrentView('account')} />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView 
          onNavigateToOrderSelection={handleNavigateToOrderSelection} 
          onNavigateToCakes={handleNavigateToCakes}
          onNavigateToReservation={handleNavigateToReservation}
        />;
      
      case 'orderSelection':
        return <OrderSelectionView onNavigate={handleNavigateToProduct} onBack={() => setCurrentView('home')} />;
        
      case 'frango':
        return <FrangoView onBack={() => setCurrentView('orderSelection')} onNavigateToAdicionais={handleNavigateToAdicionais} />;
      
      case 'churrasco':
        return <ChurrascoView onBack={() => setCurrentView('orderSelection')} onNavigateToAdicionais={handleNavigateToAdicionais} />;
      
      case 'kit':
        return <KitView onBack={() => setCurrentView('orderSelection')} onFinish={() => setCurrentView('cart')} />;
      
      case 'adicionais':
        return <AdicionaisView onBack={() => setCurrentView('home')} onFinish={() => setCurrentView('cart')} mainProducts={mainProducts} />;
      
      case 'cart':
        return <CartView onBack={() => setCurrentView('home')} onCheckout={handleCheckout} onContinueShopping={() => setCurrentView('home')} />;
      
      case 'scheduling':
        return <SchedulingView onBack={() => setCurrentView('cart')} onContinueToPayment={() => setCurrentView('payment')} />;
      
      case 'payment':
        return <PaymentView onBack={() => setCurrentView('scheduling')} onPaymentSuccess={() => setCurrentView('confirmation')} />;
      
      case 'confirmation':
        return <ConfirmationView onBackToHome={() => setCurrentView('home')} />;
      
      case 'login':
        return <LoginView onLoginSuccess={handleLoginSuccess} />;
      
      case 'account':
        return (
          <div className="flex-1 overflow-y-auto pb-32 p-4">
            <h2 className="text-xl font-bold mb-4">Minha Conta</h2>
            {state.user ? (
              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-warm-200 p-4">
                  <h3 className="font-semibold mb-2">Dados pessoais</h3>
                  <p>Nome: {state.user.name}</p>
                  <p>Email: {state.user.email}</p>
                  <p>Telefone: {state.user.phone}</p>
                </div>
                {state.user.id === '1' && (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className="w-full bg-warm-800 text-white py-3 px-4 rounded-lg font-semibold hover:bg-warm-900 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>Painel Admin</span>
                  </button>
                )}
              </div>
            ) : (
              <p>Faça login para ver suas informações</p>
            )}
          </div>
        );

      case 'cakes':
        return <CakesView onBack={() => setCurrentView('home')} onViewCart={() => setCurrentView('cart')} />;
      
      case 'reservation':
        return <ReservationView onBack={() => setCurrentView('home')} onReservationSuccess={() => setCurrentView('reservationConfirmation')} />;

      case 'reservationConfirmation':
        return <ReservationConfirmationView onBackToHome={() => setCurrentView('home')} />;
      
      default:
        return <HomeView 
          onNavigateToOrderSelection={handleNavigateToOrderSelection}
          onNavigateToCakes={handleNavigateToCakes}
          onNavigateToReservation={handleNavigateToReservation}
        />;
    }
  };

  const shouldShowBottomNav = !['login', 'confirmation', 'reservationConfirmation', 'admin'].includes(currentView);

  return (
    <div className="min-h-screen bg-warm-50 flex flex-col">
      <Header context={getHeaderContext(currentView)} />
      
      {renderCurrentView()}
      
      {shouldShowBottomNav && (
        <>
          <CartPreview onOpenCart={() => setCurrentView('cart')} />
          <BottomNav 
            currentView={currentView === 'account' || currentView === 'login' ? 'account' : currentView === 'cart' ? 'cart' : 'home'} 
            onViewChange={handleBottomNavChange} 
          />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
