import { faker } from '@faker-js/faker';
import { Order, Reservation, CartItem } from '../types';
import { products } from './products';

const generateRandomCartItems = (): CartItem[] => {
  const cart: CartItem[] = [];
  const numItems = faker.number.int({ min: 1, max: 4 });

  for (let i = 0; i < numItems; i++) {
    const product = faker.helpers.arrayElement(products);
    const quantity = faker.number.int({ min: 1, max: 3 });
    cart.push({
      id: faker.string.uuid(),
      product,
      quantity,
      subtotal: product.price * quantity,
    });
  }
  return cart;
};

export const generateMockOrders = (count: number): Order[] => {
  const orders: Order[] = [];
  for (let i = 0; i < count; i++) {
    const items = generateRandomCartItems();
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    const createdAt = faker.date.recent({ days: 30 });
    
    orders.push({
      id: `PD${faker.string.numeric(6)}`,
      items,
      total,
      pickupTime: `${faker.number.int({ min: 8, max: 9 }).toString().padStart(2, '0')}:${faker.helpers.arrayElement(['00', '10', '20', '30', '40', '50'])}`,
      status: faker.helpers.arrayElement(['completed', 'completed', 'ready', 'preparing']),
      paymentMethod: faker.helpers.arrayElement(['pix', 'card']),
      qrCode: '',
      customerName: faker.person.fullName(),
      customerEmail: faker.internet.email(),
      customerPhone: faker.phone.number(),
      createdAt,
    });
  }
  return orders;
};

export const generateMockReservations = (count: number): Reservation[] => {
  const reservations: Reservation[] = [];
  for (let i = 0; i < count; i++) {
    reservations.push({
      id: `RES-${faker.string.numeric(6)}`,
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      date: faker.date.future({ years: 0.1 }).toISOString().split('T')[0],
      time: `${faker.number.int({ min: 9, max: 18 }).toString().padStart(2, '0')}:00`,
      guests: faker.number.int({ min: 2, max: 10 }),
      type: faker.helpers.arrayElement(['familiar', 'corporativo']),
      status: faker.helpers.arrayElement(['pending', 'confirmed', 'cancelled']),
      createdAt: faker.date.recent({ days: 15 }),
    });
  }
  return reservations;
};
