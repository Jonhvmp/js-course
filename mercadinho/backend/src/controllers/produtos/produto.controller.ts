// src/controllers/productController.ts

import { Request, Response, NextFunction } from 'express';
import { pool } from '../../config/database';
import { Product } from '../../models/product';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

/**
 * Retorna todos os produtos
 */
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query<(Product & RowDataPacket)[]>('SELECT * FROM produtos');

    if (!rows.length) {
      res.status(404).json({ message: 'Nenhum produto encontrado' });
      return;
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({
      error: 'Erro interno no servidor',
      message: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

/**
 * Retorna um produto pelo ID
 */
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query<(Product & RowDataPacket)[]>(
      'SELECT * FROM produtos WHERE id = ?',
      [id]
    );

    if (!rows.length) {
      res.status(404).json({ message: 'Produto não encontrado' });
      return;
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({
      error: 'Erro interno no servidor',
      message: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

/**
 * Cria um novo produto
 */
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, descricao, preco, estoque, categoria_id, marca_id } = req.body;

    if (!nome || !preco || !estoque || !categoria_id || !marca_id) {
      res.status(400).json({ message: 'Dados obrigatórios faltando' });
      return;
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO produtos (nome, descricao, preco, estoque, categoria_id, marca_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, descricao, preco, estoque, categoria_id, marca_id]
    );

    res.status(201).json({
      message: 'Produto criado com sucesso',
      productId: result.insertId
    });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({
      error: 'Erro interno no servidor',
      message: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

/**
 * Atualiza um produto existente
 */
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, estoque, categoria_id, marca_id } = req.body;

    if (!nome || !preco || !estoque || !categoria_id || !marca_id) {
      res.status(400).json({ message: 'Dados obrigatórios faltando' });
      return;
    }

    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE produtos
       SET nome = ?, descricao = ?, preco = ?, estoque = ?, categoria_id = ?, marca_id = ?
       WHERE id = ?`,
      [nome, descricao, preco, estoque, categoria_id, marca_id, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Produto não encontrado' });
      return;
    }

    res.status(200).json({ message: 'Produto atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({
      error: 'Erro interno no servidor',
      message: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

/**
 * Deleta um produto
 */
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM produtos WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Produto não encontrado' });
      return;
    }

    res.status(200).json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({
      error: 'Erro interno no servidor',
      message: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};
