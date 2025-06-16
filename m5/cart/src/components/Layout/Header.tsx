import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Menu, Store } from 'lucide-react';
import { useCartContext } from '@src/contexts/CartContext';
import Button from '@src/components/ui/Button';
import Badge from '@src/components/ui/Badge';

interface HeaderProps {
  onCartOpen: () => void;
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartOpen, onMenuToggle }) => {
  const { getTotalItems } = useCartContext();
  const totalItems = getTotalItems;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Menu Mobile */}
          <div className="flex items-center gap-4">
            {/* Menu Mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={onMenuToggle}
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                ShopCart
              </span>
            </motion.div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search - Mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
            >
              <Search className="w-5 h-5" />
            </Button>            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartOpen}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden lg:inline">Carrinho</span>

              {totalItems > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <Badge
                    variant="danger"
                    size="sm"
                    className="min-w-[20px] h-5 text-xs font-bold"
                    animated
                  >
                    {totalItems > 99 ? '99+' : totalItems}
                  </Badge>
                </motion.div>
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
