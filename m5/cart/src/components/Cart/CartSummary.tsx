import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Truck, Calculator } from 'lucide-react';
import { formatCurrency } from '@src/utils/calculations';
import Card from '@src/components/ui/Card';
import Button from '@src/components/ui/Button';

interface CartSummaryProps {
  itemsCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  onCheckout?: () => void;
  onApplyDiscount?: (code: string) => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  itemsCount,
  subtotal,
  discount,
  shipping,
  total,
  onCheckout,
  onApplyDiscount
}) => {
  const [discountCode, setDiscountCode] = React.useState('');

  const handleApplyDiscount = () => {
    if (discountCode.trim() && onApplyDiscount) {
      onApplyDiscount(discountCode.trim());
      setDiscountCode('');
    }
  };

  const freeShippingThreshold = 200;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const isEligibleForFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <Card className="p-6 sticky top-4">
      <div className="space-y-4">
        {/* Título */}
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Resumo do Pedido
        </h3>

        {/* Informações básicas */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">
              Itens ({itemsCount})
            </span>
            <span className="font-medium">
              {formatCurrency(subtotal)}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                Desconto
              </span>
              <span className="font-medium">
                -{formatCurrency(discount)}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="flex items-center gap-1 text-gray-600">
              <Truck className="w-4 h-4" />
              Frete
            </span>
            <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
              {shipping === 0 ? 'Grátis' : formatCurrency(shipping)}
            </span>
          </div>

          {/* Aviso de frete grátis */}
          {!isEligibleForFreeShipping && remainingForFreeShipping > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-blue-50 border border-blue-200 rounded-md"
            >
              <p className="text-sm text-blue-800">
                Adicione mais {formatCurrency(remainingForFreeShipping)} para ganhar <strong>frete grátis!</strong>
              </p>
            </motion.div>
          )}

          {isEligibleForFreeShipping && shipping === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-green-50 border border-green-200 rounded-md"
            >
              <p className="text-sm text-green-800 font-medium">
                🎉 Você ganhou frete grátis!
              </p>
            </motion.div>
          )}
        </div>

        {/* Cupom de desconto */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Cupom de desconto
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Digite seu cupom"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleApplyDiscount}
              disabled={!discountCode.trim()}
            >
              Aplicar
            </Button>
          </div>
        </div>

        {/* Divisor */}
        <hr className="border-gray-200" />

        {/* Total */}
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total</span>
          <span className="text-xl text-blue-600">
            {formatCurrency(total)}
          </span>
        </div>

        {/* Botão de checkout */}
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={onCheckout}
          disabled={itemsCount === 0}
        >
          Finalizar Compra
        </Button>

        {/* Informações adicionais */}
        <div className="text-xs text-gray-500 text-center space-y-1">
          <p>🔒 Compra 100% segura e protegida</p>
          <p>📦 Entrega em 2-5 dias úteis</p>
          <p>🔄 30 dias para trocas e devoluções</p>
        </div>
      </div>
    </Card>
  );
};

export default CartSummary;
