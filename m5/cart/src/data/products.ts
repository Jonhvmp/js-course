import { Product } from '@src/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Smartphone Premium',
    price: 1299.99,
    image: '/images/product-1.webp',
    description: 'Smartphone de última geração com câmera profissional e bateria de longa duração.',
    category: 'Electronics',
    rating: 4.8,
    stock: 15,
    featured: true
  },
  {
    id: '2',
    name: 'Notebook Gamer',
    price: 2499.99,
    image: '/images/product-2.webp',
    description: 'Notebook high-end para jogos com placa de vídeo dedicada e processador i7.',
    category: 'Electronics',
    rating: 4.9,
    stock: 8,
    featured: true
  },
  {
    id: '3',
    name: 'Fone Bluetooth Premium',
    price: 299.99,
    image: '/images/product-3.jpg',
    description: 'Fone de ouvido sem fio com cancelamento de ruído ativo e som hi-fi.',
    category: 'Audio',
    rating: 4.6,
    stock: 25,
    featured: false
  },
  {
    id: '4',
    name: 'Smart Watch Pro',
    price: 599.99,
    image: '/images/product-4.jpg',
    description: 'Relógio inteligente com GPS, monitor cardíaco e resistência à água.',
    category: 'Wearables',
    rating: 4.7,
    stock: 12,
    featured: true
  },
  {
    id: '5',
    name: 'Câmera DSLR',
    price: 1899.99,
    image: '/images/product-5.png',
    description: 'Câmera profissional com lente intercambiável e gravação em 4K.',
    category: 'Photography',
    rating: 4.9,
    stock: 6,
    featured: false
  },
  {
    id: '6',
    name: 'Tablet Ultra',
    price: 899.99,
    image: '/images/product-6.webp',
    description: 'Tablet com tela OLED, processador octacore e suporte à caneta digital.',
    category: 'Electronics',
    rating: 4.5,
    stock: 18,
    featured: false
  },
  {
    id: '7',
    name: 'Console Gamer',
    price: 499.99,
    image: '/images/product-7.jpg',
    description: 'Console de última geração com jogos em 4K e realidade virtual.',
    category: 'Gaming',
    rating: 4.8,
    stock: 10,
    featured: true
  },
  {
    id: '8',
    name: 'Monitor 4K',
    price: 699.99,
    image: '/images/product-8.webp',
    description: 'Monitor profissional 27" com resolução 4K e taxa de atualização 144Hz.',
    category: 'Electronics',
    rating: 4.7,
    stock: 14,
    featured: false
  }
];

export const categories = [
  'All',
  'Electronics',
  'Audio',
  'Wearables',
  'Photography',
  'Gaming'
];

export const featuredProducts = products.filter(product => product.featured);

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'All') return products;
  return products.filter(product => product.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
}
