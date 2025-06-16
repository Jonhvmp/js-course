import { Product } from '@src/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Smartphone Premium',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop&crop=center',
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
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop&crop=center',
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
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&crop=center',
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
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&crop=center',
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
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop&crop=center',
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
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop&crop=center',
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
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop&crop=center',
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
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop&crop=center',
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
