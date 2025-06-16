import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Package, Tag, Star, Headphones, Camera, Gamepad2 } from 'lucide-react';
import { categories } from '@src/data/products';
import Button from '@src/components/ui/Button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentCategory?: string;
  onCategorySelect?: (category: string) => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  'All': Home,
  'Electronics': Package,
  'Audio': Headphones,
  'Wearables': Tag,
  'Photography': Camera,
  'Gaming': Gamepad2
};

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentCategory = 'All',
  onCategorySelect
}) => {
  const handleCategoryClick = (category: string) => {
    onCategorySelect?.(category);
    onClose();
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
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-50 lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Categorias
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

            {/* Navigation */}
            <nav className="p-4">
              <ul className="space-y-2">
                {categories.map((category) => {
                  const Icon = categoryIcons[category] || Package;
                  const isActive = currentCategory === category;

                  return (
                    <li key={category}>
                      <button
                        onClick={() => handleCategoryClick(category)}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left
                          ${isActive
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" />
                        {category === 'All' ? 'Todas as categorias' : category}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  🔥 Ofertas especiais
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  Ver Promoções
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
