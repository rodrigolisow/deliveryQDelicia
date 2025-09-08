import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Product, User, Order, Reservation } from '../types';
import { generateMockOrders, generateMockReservations } from '../data/admin';

interface AppState {
  user: User | null;
  cart: CartItem[];
  isOpen: boolean;
  selectedPickupTime: string | null;
  currentOrder: Order | null;
  orders: Order[];
  reservations: Reservation[];
  latestReservation: Reservation | null;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'UPDATE_CART_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_PICKUP_TIME'; payload: string | null }
  | { type: 'SET_CURRENT_ORDER'; payload: Order | null }
  | { type: 'SET_IS_OPEN'; payload: boolean }
  | { type: 'ADD_RESERVATION'; payload: Reservation }
  | { type: 'UPDATE_RESERVATION_STATUS'; payload: { id: string; status: 'pending' | 'confirmed' | 'cancelled' } };

const initialState: AppState = {
  user: null,
  cart: [],
  isOpen: checkIfOpen(),
  selectedPickupTime: null,
  currentOrder: null,
  orders: generateMockOrders(15),
  reservations: generateMockReservations(8),
  latestReservation: null,
};

function checkIfOpen(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  
  // Sunday is 0, check if it's Sunday and between 8-10
  return day === 0 && hour >= 8 && hour < 10;
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.product.id === action.payload.product.id);
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity, subtotal: (item.quantity + action.payload.quantity) * item.product.price }
              : item
          )
        };
      }
      
      const newItem: CartItem = {
        id: `${action.payload.product.id}-${Date.now()}`,
        product: action.payload.product,
        quantity: action.payload.quantity,
        subtotal: action.payload.quantity * action.payload.product.price
      };
      
      return { ...state, cart: [...state.cart, newItem] };
    }
    
    case 'UPDATE_CART_ITEM':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload.id)
        };
      }
      
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity, subtotal: action.payload.quantity * item.product.price }
            : item
        )
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [], selectedPickupTime: null };
    
    case 'SET_PICKUP_TIME':
      return { ...state, selectedPickupTime: action.payload };
    
    case 'SET_CURRENT_ORDER':
      const newOrder = action.payload;
      return { 
        ...state, 
        currentOrder: newOrder,
        orders: newOrder ? [...state.orders, newOrder] : state.orders
      };
    
    case 'SET_IS_OPEN':
      return { ...state, isOpen: action.payload };

    case 'ADD_RESERVATION':
      return { 
        ...state, 
        reservations: [...state.reservations, action.payload],
        latestReservation: action.payload
      };
    
    case 'UPDATE_RESERVATION_STATUS':
      return {
        ...state,
        reservations: state.reservations.map(res =>
          res.id === action.payload.id
            ? { ...res, status: action.payload.status }
            : res
        )
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
