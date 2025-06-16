import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '@src/hooks/useCart';
import { cartVariants, listVariants } from '@src/utils/animations';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import Button from '@src/components/ui/Button';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const {
    state,
    updateQuantity,
    removeItem,
    clearCart,
    getCartSummary
  } = useCart();

  const summary = getCartSummary;

  const handleCheckout = () => {
    // Aqui você implementaria a lógica de checkout
    alert('Redirecionando para o checkout...');
    onClose();
  };

  const handleApplyDiscount = (code: string) => {
    // Lógica simples de cupom de desconto
    const discountCodes: Record<string, number> = {
      'DESCONTO10': 10,
      'PRIMEIRACOMPRA': 15,
      'FRETE10': 5
    };

    const discountPercent = discountCodes[code.toUpperCase()];
    if (discountPercent) {
      // Aqui você aplicaria o desconto via dispatch
      alert(`Cupom aplicado! Desconto de ${discountPercent}%`);
    } else {
      alert('Cupom inválido');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Cart Sidebar */}
          <motion.div
            variants={cartVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Carrinho ({summary.itemsCount})
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Content */}
            <div className="flex flex-col h-full">
              {state.items.length === 0 ? (
                /* Empty Cart */
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Seu carrinho está vazio
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Adicione alguns produtos para começar suas compras
                    </p>
                    <Button
                      variant="primary"
                      onClick={onClose}
                    >
                      Continuar Comprando
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="flex-1 overflow-y-auto p-4">
                    <motion.div
                      variants={listVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-4"
                    >
                      <AnimatePresence mode="popLayout">
                        {state.items.map((item) => (
                          <CartItem
                            key={item.product.id}
                            item={item}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeItem}
                          />
                        ))}
                      </AnimatePresence>
                    </motion.div>

                    {/* Clear Cart Button */}
                    {state.items.length > 1 && (
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearCart}
                          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Limpar Carrinho
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Cart Summary */}
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <CartSummary
                      itemsCount={summary.itemsCount}
                      subtotal={summary.subtotal}
                      discount={summary.discount}
                      shipping={summary.shipping}
                      total={summary.total}
                      onCheckout={handleCheckout}
                      onApplyDiscount={handleApplyDiscount}
                    />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
