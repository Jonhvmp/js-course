import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Package } from 'lucide-react';
import { Product } from '@src/types/product';
import { useCart } from '@src/hooks/useCart';
import { cardVariants } from '@src/utils/animations';
import { formatCurrency } from '@src/utils/calculations';
import Card from '@src/components/ui/Card';
import Button from '@src/components/ui/Button';
import Badge from '@src/components/ui/Badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, isInCart, getItemQuantity } = useCart();
  const [isLoading, setIsLoading] = React.useState(false);

  const quantity = getItemQuantity(product.id);
  const inCart = isInCart(product.id);

  const handleAddToCart = async () => {
    setIsLoading(true);
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addItem(product);
    setIsLoading(false);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-500 ml-1">
          ({rating})
        </span>
      </div>
    );
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      <Card className="overflow-hidden h-full group" hoverable>        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-white border-b border-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=${product.name.charAt(0)}`;
            }}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <Badge variant="primary" size="sm" animated>
                ⭐ Destaque
              </Badge>
            )}
            
            {product.stock < 10 && product.stock > 0 && (
              <Badge variant="warning" size="sm">
                Últimas unidades
              </Badge>
            )}
            
            {product.stock === 0 && (
              <Badge variant="danger" size="sm">
                Esgotado
              </Badge>
            )}
          </div>

          {/* Quick Add Button - Aparece no hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <Button
              variant="primary"
              size="sm"
              className="w-full backdrop-blur-sm bg-blue-600/90 hover:bg-blue-700/90"
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isLoading}
              isLoading={isLoading}
            >
              <ShoppingCart className="w-4 h-4" />
              {inCart ? `Adicionar Mais (${quantity})` : 'Adicionar ao Carrinho'}
            </Button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Category */}
          <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          {renderStars(product.rating)}

          {/* Price and Stock */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-gray-900">
                {formatCurrency(product.price)}
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Package className="w-4 h-4" />
              {product.stock} disponíveis
            </div>
          </div>

          {/* Add to Cart Button - Desktop */}
          <Button
            variant="outline"
            size="md"
            className="w-full md:hidden"
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isLoading}
            isLoading={isLoading}
          >
            <ShoppingCart className="w-4 h-4" />
            {inCart ? 'Adicionar Mais' : 'Adicionar ao Carrinho'}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
