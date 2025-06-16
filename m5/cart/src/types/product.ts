export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  stock: number;
  featured?: boolean;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
}
