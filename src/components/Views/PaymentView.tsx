import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Shield, Clock, Copy } from 'lucide-react';
import QRCode from 'qrcode';
import { useApp } from '../../context/AppContext';
import { CardForm } from '../Common/CardForm';
import { AppConfig } from '../../config';

interface PaymentViewProps {
  onBack: () => void;
  onPaymentSuccess: () => void;
}

export function PaymentView({ onBack, onPaymentSuccess }: PaymentViewProps) {
  const { state, dispatch } = useApp();
  const [paymentStep, setPaymentStep] = useState<'select' | 'pix' | 'card'>('select');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pixQrCode, setPixQrCode] = useState('');
  const [pixCode] = useState('00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266554400005204000053039865802BR5913Joao da Silva6009SAO PAULO62070503***6304E2A3');
  const [copied, setCopied] = useState(false);

  const total = state.cart.reduce((sum, item) => sum + item.subtotal, 0);

  useEffect(() => {
    if (paymentStep === 'pix' && !pixQrCode) {
      QRCode.toDataURL(pixCode, { width: 256, margin: 2 })
        .then(url => setPixQrCode(url))
        .catch(err => console.error(err));
    }
  }, [paymentStep, pixCode, pixQrCode]);

  const handlePayment = (method: 'pix' | 'card') => {
    if (isProcessing) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const orderId = `PD${Date.now().toString().slice(-6)}`;
      
      dispatch({ 
        type: 'SET_CURRENT_ORDER', 
        payload: {
          id: orderId,
          items: state.cart,
          total: total,
          pickupTime: state.selectedPickupTime!,
          status: 'paid',
          paymentMethod: method,
          qrCode: `data:image/svg+xml,${encodeURIComponent(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><text x="100" y="105" text-anchor="middle" font-size="12" fill="black">${orderId}</text></svg>`)}`,
          customerName: state.user!.name,
          customerEmail: state.user!.email,
          customerPhone: state.user!.phone,
          createdAt: new Date(),
        }
      });
      
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2500);
  };
  
  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    switch (paymentStep) {
      case 'select':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Forma de pagamento:</h3>
            <button onClick={() => setPaymentStep('pix')} className="w-full p-4 rounded-xl border-2 border-warm-200 bg-white hover:border-primary-300 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"><Smartphone className="w-6 h-6 text-green-600" /></div>
                <div className="flex-1 text-left"><h4 className="font-semibold text-gray-900">PIX</h4><p className="text-sm text-gray-600">Aprovação instantânea</p></div>
              </div>
            </button>
            <button onClick={() => setPaymentStep('card')} className="w-full p-4 rounded-xl border-2 border-warm-200 bg-white hover:border-primary-300 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><CreditCard className="w-6 h-6 text-blue-600" /></div>
                <div className="flex-1 text-left"><h4 className="font-semibold text-gray-900">Cartão</h4><p className="text-sm text-gray-600">Crédito ou débito</p></div>
              </div>
            </button>
          </div>
        );
      case 'pix':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Pague com PIX</h3>
            <div className="bg-white border border-warm-200 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600 mb-4">Escaneie o QR Code com o app do seu banco</p>
              {pixQrCode ? <img src={pixQrCode} alt="PIX QR Code" className="w-48 h-48 mx-auto mb-4 border rounded-lg" /> : <div className="w-48 h-48 mx-auto bg-gray-200 animate-pulse rounded-lg"></div>}
              <button onClick={handleCopyPix} className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                <Copy className="w-4 h-4" />
                <span>{copied ? 'Copiado!' : 'Copiar Código PIX'}</span>
              </button>
            </div>
            <button onClick={() => handlePayment('pix')} disabled={isProcessing} className="w-full py-4 px-6 rounded-xl font-semibold transition-colors bg-primary-600 text-white hover:bg-primary-700 disabled:bg-gray-300">
              {isProcessing ? 'Processando...' : `Confirmar Pagamento de R$ ${total.toFixed(2).replace('.', ',')}`}
            </button>
            <button onClick={() => setPaymentStep('select')} className="w-full text-center text-sm text-gray-600 hover:text-primary-600 py-2">Trocar forma de pagamento</button>
          </div>
        );
      case 'card':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Dados do Cartão</h3>
            <CardForm />
            <button onClick={() => handlePayment('card')} disabled={isProcessing} className="w-full py-4 px-6 rounded-xl font-semibold transition-colors bg-primary-600 text-white hover:bg-primary-700 disabled:bg-gray-300">
              {isProcessing ? 'Processando...' : `Pagar R$ ${total.toFixed(2).replace('.', ',')}`}
            </button>
            <button onClick={() => setPaymentStep('select')} className="w-full text-center text-sm text-gray-600 hover:text-primary-600 py-2">Trocar forma de pagamento</button>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="sticky top-0 bg-white border-b border-warm-200 z-10">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-2">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft className="w-6 h-6" /></button>
            <h2 className="text-xl font-bold text-gray-900">Pagamento</h2>
          </div>
          <p className="text-gray-600 text-sm">Pagamento seguro online. Sem taxa de entrega — retirada no local.</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-warm-50 border border-warm-200 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Resumo do pedido</h3>
          <div className="space-y-2">
            {state.cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm"><span className="text-gray-600">{item.quantity}x {item.product.name}</span><span className="font-medium">R$ {item.subtotal.toFixed(2).replace('.', ',')}</span></div>
            ))}
          </div>
          <div className="border-t border-warm-300 mt-3 pt-3">
            <div className="flex justify-between"><span className="font-semibold text-gray-900">Total:</span><span className="font-bold text-xl text-primary-600">R$ {total.toFixed(2).replace('.', ',')}</span></div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2"><Clock className="w-5 h-5 text-blue-600" /><h3 className="font-semibold text-blue-900">Retirada agendada</h3></div>
          <p className="text-blue-700"><strong>{state.selectedPickupTime}</strong> - Domingo</p>
          <p className="text-blue-600 text-sm mt-1">{AppConfig.address}</p>
        </div>

        {renderContent()}

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-600" />
            <div>
              <h4 className="font-semibold text-gray-900">Pagamento seguro</h4>
              <p className="text-sm text-gray-600">Seus dados são protegidos com criptografia SSL</p>
            </div>
          </div>
        </div>
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-primary-700 font-semibold">Processando pagamento...</p>
        </div>
      )}
    </div>
  );
}
