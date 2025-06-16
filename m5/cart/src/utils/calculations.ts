import { CartItem } from '@src/types/cart';

/**
 * Calcula o total do carrinho
 */
export function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

/**
 * Calcula o número total de itens no carrinho
 */
export function calculateTotalItems(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Calcula o desconto aplicado
 */
export function calculateDiscount(total: number, discountPercent: number): number {
  return (total * discountPercent) / 100;
}

/**
 * Calcula o total final incluindo desconto e frete
 */
export function calculateFinalTotal(
  subtotal: number,
  discountPercent: number = 0,
  shipping: number = 0
): number {
  const discount = calculateDiscount(subtotal, discountPercent);
  return Math.max(0, subtotal - discount + shipping);
}

/**
 * Formata um valor monetário para exibição
 */
export function formatCurrency(value: number, currency: string = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

/**
 * Calcula a economia com desconto
 */
export function calculateSavings(originalPrice: number, discountPercent: number): number {
  return (originalPrice * discountPercent) / 100;
}

/**
 * Verifica se um produto está em estoque
 */
export function isInStock(stock: number, quantity: number = 1): boolean {
  return stock >= quantity;
}

/**
 * Calcula o frete baseado no total da compra
 */
export function calculateShipping(total: number, freeShippingThreshold: number = 200): number {
  if (total >= freeShippingThreshold) {
    return 0;
  }

  // Frete fixo para compras abaixo do threshold
  return 15.99;
}

/**
 * Calcula a porcentagem de desconto entre dois valores
 */
export function getDiscountPercentage(originalPrice: number, salePrice: number): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Valida se uma quantidade é válida
 */
export function validateQuantity(quantity: number, stock: number, min: number = 1): boolean {
  return quantity >= min && quantity <= stock && Number.isInteger(quantity);
}
