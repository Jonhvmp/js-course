'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Sparkles, TrendingUp, Star } from 'lucide-react';
import { products } from '@src/data/products';
import { pageVariants } from '@src/utils/animations';
import Header from '@src/components/Layout/Header';
import Sidebar from '@src/components/Layout/Sidebar';
import Cart from '@src/components/Cart/Cart';
import ProductList from '@src/components/Product/ProductList';
import Card from '@src/components/ui/Card';
import Button from '@src/components/ui/Button';

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <Header
        onCartOpen={() => setCartOpen(true)}
        onMenuToggle={() => setSidebarOpen(true)}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Cart */}
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              Bem-vindo ao ShopCart
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Sua loja
              <span className="text-blue-600"> online</span>
              <br />
              completa
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Descubra os melhores produtos com tecnologia avançada,
              carrinho inteligente e experiência de compra única.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                <ShoppingBag className="w-5 h-5" />
                Começar a Comprar
              </Button>
              <Button variant="outline" size="lg">
                <TrendingUp className="w-5 h-5" />
                Ver Ofertas
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {products.length}+ Produtos
              </h3>
              <p className="text-gray-600">
                Variedade incrível de produtos para você escolher
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                4.8 Avaliação
              </h3>
              <p className="text-gray-600">
                Produtos de alta qualidade com ótimas avaliações
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Frete Grátis
              </h3>
              <p className="text-gray-600">
                Acima de R$ 200 em compras, frete gratuito
              </p>
            </Card>
          </div>
        </motion.section>

        {/* All Products */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <ProductList
            products={filteredProducts}
            title="Todos os Produtos"
          />
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2025 ShopCart. Jonh Alex
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
