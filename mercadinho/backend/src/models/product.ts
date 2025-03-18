// src/models/product.ts

export interface Product {
  id?: number; // id opcional
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
  categoria_id: number;
  marca_id: number;
  created_at?: Date;
  updated_at?: Date;
}
