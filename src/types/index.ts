export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'frango' | 'churrasco' | 'adicional' | 'bolo-doce';
  type?: 'com-recheio' | 'sem-recheio' | 'maminha' | 'fraldinha' | 'costela-gado' | 'costela-suina' | 'picanha' | 'alcatra' | 'file-duplo' | 'maionese' | 'refrigerante' | 'bolo' | 'torta' | 'doce';
  unit: 'unidade' | 'porção' | 'kg';
  serves?: number;
  available: boolean;
  stock: 'disponível' | 'poucos-restantes' | 'esgotado';
  image?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  capacity: number;
  booked: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  pickupTime: string;
  status: 'pending' | 'paid' | 'preparing' | 'ready' | 'completed';
  paymentMethod: 'pix' | 'card';
  qrCode: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: Order[];
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  type: 'corporativo' | 'familiar';
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}
