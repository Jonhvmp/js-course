// Módulo para gerenciar produtos
const ProductManager = (() => {
  let products = [];

  const addProduct = (name, quantity, price) => {
    products.push({ name, quantity: Number(quantity), price: Number(price) });
  };

  const removeProduct = (index) => {
    products.splice(index, 1);
  };

  const calculateTotal = () => {
    return products.reduce((sum, product) => sum + product.quantity * product.price, 0);
  };

  const getProducts = () => {
    return products;
  };

  return {
    addProduct,
    removeProduct,
    calculateTotal,
    getProducts,
  };
})();
