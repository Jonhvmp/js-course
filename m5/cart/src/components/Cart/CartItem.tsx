import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '@src/types/cart';
import { cartItemVariants } from '@src/utils/animations';
import { formatCurrency } from '@src/utils/calculations';
import Button from '@src/components/ui/Button';
import Card from '@src/components/ui/Card';
import Image from 'next/image';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove
}) => {
  const { product, quantity } = item;
  const totalPrice = product.price * quantity;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      onUpdateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(product.id, quantity - 1);
    } else {
      onRemove(product.id);
    }
  };

  return (
    <motion.div
      variants={cartItemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      <Card className="p-4">
        <div className="flex items-center gap-4">
          {/* Imagem do produto */}
          <div className="flex-shrink-0">            <Image
            src={product.image}
            alt={product.name}
            width={64}
            height={64}
            className="w-16 h-16 object-cover rounded-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://via.placeholder.com/64x64/f3f4f6/9ca3af?text=${product.name.charAt(0)}`;
            }}
          />
          </div>

          {/* Informações do produto */}
          <div className="flex-grow min-w-0">
            <h3 className="font-medium text-gray-900 truncate">
              {product.name}
            </h3>            <p className="text-sm text-gray-600 truncate">
              {product.description}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-lg font-semibold text-gray-900">
                {formatCurrency(totalPrice)}
              </span>
              <span className="text-sm text-gray-700 font-medium">
                {formatCurrency(product.price)} cada
              </span>
            </div>
          </div>

          {/* Controles de quantidade */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2">              <Button
              variant="outline"
              size="sm"
              className="w-8 h-8 p-0 rounded-full border-gray-400 hover:border-gray-600 text-gray-700 hover:text-gray-900"
              onClick={handleDecrement}
            >
              <Minus className="w-3 h-3" />
            </Button>

              <span className="w-8 text-center font-semibold text-gray-900">
                {quantity}
              </span>

              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0 rounded-full border-gray-400 hover:border-gray-600 text-gray-700 hover:text-gray-900"
                onClick={handleIncrement}
                disabled={quantity >= product.stock}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>

            {/* Botão de remover */}            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 text-red-700 hover:text-red-800 hover:bg-red-50 font-medium"
              onClick={() => onRemove(product.id)}
            >
              <Trash2 className="w-4 h-4" />
              Remover
            </Button>
          </div>
        </div>

        {/* Aviso de estoque baixo */}
        {quantity >= product.stock && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              Quantidade máxima disponível: {product.stock}
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default CartItem;
