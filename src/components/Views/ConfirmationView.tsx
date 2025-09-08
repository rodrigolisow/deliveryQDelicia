import React, { useEffect, useState } from 'react';
import { Check, MapPin, Copy, Share2, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppConfig } from '../../config';

interface ConfirmationViewProps {
  onBackToHome: () => void;
}

export function ConfirmationView({ onBackToHome }: ConfirmationViewProps) {
  const { state, dispatch } = useApp();
  const [copied, setCopied] = useState(false);

  const order = state.currentOrder;

  useEffect(() => {
    // Clear cart after confirmation view is shown
    return () => {
      dispatch({ type: 'CLEAR_CART' });
    };
  }, [dispatch]);

  if (!order) {
    // Fallback if there's no order in context
    return (
      <div className="flex-1 flex items-center justify-center text-center p-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">Nenhum pedido encontrado.</h2>
          <button
            onClick={onBackToHome}
            className="bg-primary-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(AppConfig.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Meu pedido na Panificadora que delicia!',
        text: `Pedido ${order.id} agendado para ${order.pickupTime}`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="p-4 space-y-6">
        {/* Success Header */}
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Pagamento confirmado!
          </h2>
          <p className="text-gray-600">
            Seu pedido está garantido para retirada às <strong>{order.pickupTime}</strong>
          </p>
        </div>

        {/* QR Code */}
        <div className="bg-white border border-warm-200 rounded-xl p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-4">QR Code do pedido</h3>
          <div className="w-48 h-48 mx-auto mb-4 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center bg-white">
            <img src={order.qrCode} alt="QR Code" className="w-full h-full object-contain" />
          </div>
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <span className="font-mono text-lg font-semibold text-gray-900">{order.id}</span>
          </div>
          <p className="text-sm text-gray-600">
            Mostre este QR code no balcão no horário agendado
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-warm-50 border border-warm-200 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Resumo do pedido</h3>
          
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.quantity}x {item.product.name}
                </span>
                <span className="font-medium">
                  R$ {item.subtotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-warm-300 mt-3 pt-3">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900">Total pago ({order.paymentMethod === 'card' ? 'Cartão' : 'PIX'}):</span>
              <span className="font-bold text-xl text-green-600">
                R$ {order.total.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>
        </div>

        {/* Pickup Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Instruções para retirada</h3>
          </div>
          <ul className="text-blue-700 text-sm space-y-2">
            <li>• <strong>Chegue no horário agendado:</strong> {order.pickupTime}</li>
            <li>• <strong>Dirija-se ao balcão:</strong> "Pedidos Online"</li>
            <li>• <strong>Apresente:</strong> QR code ou seu documento</li>
            <li>• <strong>Aguarde:</strong> chamada no painel/alto-falante</li>
          </ul>
        </div>

        {/* Location */}
        <div className="bg-white border border-warm-200 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <MapPin className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Local de retirada</h3>
          </div>
          <p className="text-gray-700 mb-4">
            {AppConfig.address}<br />
            Panificadora que delicia!
          </p>
          
          <div className="flex space-x-2">
            <button
              onClick={() => window.open(AppConfig.mapLink, '_blank')}
              className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              Ver mapa
            </button>
            <button
              onClick={handleCopyAddress}
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? 'Copiado!' : 'Copiar endereço'}</span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleShare}
            className="w-full border border-primary-600 text-primary-600 py-3 px-6 rounded-xl font-medium hover:bg-primary-50 transition-colors flex items-center justify-center space-x-2"
          >
            <Share2 className="w-5 h-5" />
            <span>Compartilhar pedido</span>
          </button>
          
          <button
            onClick={onBackToHome}
            className="w-full bg-primary-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            Fazer novo pedido
          </button>
        </div>

        {/* Footer Info */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>Obrigado por escolher a Panificadora que delicia!</p>
          <p>Em caso de dúvidas, entre em contato: {AppConfig.contactPhone}</p>
        </div>
      </div>
    </div>
  );
}
