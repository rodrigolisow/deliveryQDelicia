import { Product } from '../types';

export const products: Product[] = [
  // Frangos
  {
    id: 'frango-com-recheio',
    name: 'Frango Assado com Recheio',
    description: 'Frango assado temperado com recheio especial da casa',
    price: 25.90,
    category: 'frango',
    type: 'com-recheio',
    unit: 'unidade',
    serves: 4,
    available: true,
    stock: 'disponível',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=200&fit=crop'
  },
  {
    id: 'frango-sem-recheio',
    name: 'Frango Assado sem Recheio',
    description: 'Frango assado temperado no ponto, sem recheio',
    price: 22.90,
    category: 'frango',
    type: 'sem-recheio',
    unit: 'unidade',
    serves: 4,
    available: true,
    stock: 'disponível',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=200&fit=crop'
  },
  
  // Churrascos
  {
    id: 'maminha',
    name: 'Maminha',
    description: 'Corte macio e suculento, ideal para churrasco',
    price: 45.90,
    category: 'churrasco',
    type: 'maminha',
    unit: 'kg',
    available: true,
    stock: 'disponível',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop'
  },
  {
    id: 'fraldinha',
    name: 'Fraldinha',
    description: 'Corte tradicional brasileiro, muito saboroso',
    price: 42.90,
    category: 'churrasco',
    type: 'fraldinha',
    unit: 'kg',
    available: true,
    stock: 'poucos-restantes',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop'
  },
  {
    id: 'costela-gado',
    name: 'Costela de Gado',
    description: 'Costela bovina suculenta e bem temperada',
    price: 38.90,
    category: 'churrasco',
    type: 'costela-gado',
    unit: 'kg',
    available: true,
    stock: 'disponível',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop'
  },
  {
    id: 'costela-suina',
    name: 'Costela Suína',
    description: 'Costela de porco no ponto ideal',
    price: 35.90,
    category: 'churrasco',
    type: 'costela-suina',
    unit: 'kg',
    available: true,
    stock: 'disponível',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop'
  },
  {
    id: 'picanha',
    name: 'Picanha',
    description: 'O corte nobre brasileiro, suculento e saboroso',
    price: 65.90,
    category: 'churrasco',
    type: 'picanha',
    unit: 'kg',
    available: true,
    stock: 'disponível',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop'
  },
  {
    id: 'alcatra',
    name: 'Alcatra',
    description: 'Corte magro e saboroso, perfeito para churrasco',
    price: 48.90,
    category: 'churrasco',
    type: 'alcatra',
    unit: 'kg',
    available: true,
    stock: 'disponível',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop'
  },
  {
    id: 'file-duplo',
    name: 'Filé Duplo',
    description: 'Corte premium, extremamente macio',
    price: 78.90,
    category: 'churrasco',
    type: 'file-duplo',
    unit: 'kg',
    available: false,
    stock: 'esgotado',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop'
  },
  
  // Adicionais
  {
    id: 'maionese',
    name: 'Maionese da Casa',
    description: 'Maionese especial temperada',
    price: 4.50,
    category: 'adicional',
    type: 'maionese',
    unit: 'unidade',
    available: true,
    stock: 'disponível',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=300&h=200&fit=crop'
  },
  {
    id: 'coca-cola',
    name: 'Coca-Cola 350ml',
    description: 'Refrigerante gelado',
    price: 4.00,
    category: 'adicional',
    type: 'refrigerante',
    unit: 'unidade',
    available: true,
    stock: 'disponível',
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=300&h=200&fit=crop'
  },
  {
    id: 'guarana',
    name: 'Guaraná 350ml',
    description: 'Refrigerante gelado',
    price: 4.00,
    category: 'adicional',
    type: 'refrigerante',
    unit: 'unidade',
    available: true,
    stock: 'disponível',
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=300&h=200&fit=crop'
  },
  {
    id: 'coca-cola-2l',
    name: 'Coca-Cola 2L',
    description: 'Refrigerante familia',
    price: 8.50,
    category: 'adicional',
    type: 'refrigerante',
    unit: 'unidade',
    available: true,
    stock: 'poucos-restantes',
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=300&h=200&fit=crop'
  },

  // Bolos e Doces
  {
    id: 'bolo-chocolate',
    name: 'Bolo de Chocolate',
    description: 'Bolo fofinho de chocolate com cobertura cremosa.',
    price: 35.00,
    category: 'bolo-doce',
    type: 'bolo',
    unit: 'unidade',
    available: true,
    stock: 'disponível',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop'
  },
  {
    id: 'torta-limao',
    name: 'Torta de Limão',
    description: 'Torta de limão com merengue suíço maçaricado.',
    price: 45.00,
    category: 'bolo-doce',
    type: 'torta',
    unit: 'unidade',
    available: true,
    stock: 'poucos-restantes',
    image: 'https://images.unsplash.com/photo-1543588925-56044a1779e3?w=300&h=200&fit=crop'
  },
  {
    id: 'pudim-leite',
    name: 'Pudim de Leite',
    description: 'Pudim de leite condensado cremoso e sem furinhos.',
    price: 25.00,
    category: 'bolo-doce',
    type: 'doce',
    unit: 'unidade',
    available: true,
    stock: 'disponível',
    image: 'https://images.unsplash.com/photo-1627703901686-b41386420054?w=300&h=200&fit=crop'
  },
  {
    id: 'brigadeiro',
    name: 'Brigadeiro Gourmet',
    description: 'Brigadeiro feito com chocolate belga.',
    price: 4.00,
    category: 'bolo-doce',
    type: 'doce',
    unit: 'unidade',
    available: true,
    stock: 'disponível',
    image: 'https://images.unsplash.com/photo-1593489895432-3b3329046a48?w=300&h=200&fit=crop'
  }
];

export function getProductsByCategory(category: 'frango' | 'churrasco' | 'adicional' | 'bolo-doce'): Product[] {
  return products.filter(product => product.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}
