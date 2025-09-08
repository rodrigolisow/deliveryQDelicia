import React, { useState } from 'react';
import { CreditCard, User, Calendar, Lock } from 'lucide-react';

export function CardForm() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/[^0-9]/gi, '');
    if (v.length >= 3) {
      return `${v.slice(0, 2)} / ${v.slice(2, 4)}`;
    }
    return v;
  };

  return (
    <div className="bg-white border border-warm-200 rounded-xl p-4 space-y-4">
      <div className="relative">
        <label htmlFor="cardNumber" className="text-xs font-medium text-gray-500">Número do Cartão</label>
        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          id="cardNumber"
          placeholder="0000 0000 0000 0000"
          value={formatCardNumber(cardNumber)}
          onChange={(e) => setCardNumber(e.target.value)}
          maxLength={19}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      <div className="relative">
        <label htmlFor="cardName" className="text-xs font-medium text-gray-500">Nome no Cartão</label>
        <User className="absolute left-3 top-1/2 -translate-y-1/3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          id="cardName"
          placeholder="Seu nome completo"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div className="flex space-x-4">
        <div className="relative w-1/2">
          <label htmlFor="expiry" className="text-xs font-medium text-gray-500">Validade</label>
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            id="expiry"
            placeholder="MM / AA"
            value={formatExpiry(expiry)}
            onChange={(e) => setExpiry(e.target.value)}
            maxLength={7}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div className="relative w-1/2">
          <label htmlFor="cvv" className="text-xs font-medium text-gray-500">CVV</label>
          <Lock className="absolute left-3 top-1/2 -translate-y-1/3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            id="cvv"
            placeholder="123"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength={4}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
    </div>
  );
}
