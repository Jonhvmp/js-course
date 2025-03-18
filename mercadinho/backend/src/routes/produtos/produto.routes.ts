// src/routes/productRoutes.ts

import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../../controllers/produtos/produto.controller';

const router = Router();

// Lista todos os produtos
router.get('/', getAllProducts);

// Retorna um produto pelo ID
router.get('/:id', getProductById);

// Cria um novo produto
router.post('/', createProduct);

// Atualiza um produto existente
router.put('/:id', updateProduct);

// Deleta um produto
router.delete('/:id', deleteProduct);

export default router;
