import { Request, Response } from 'express';
import { pool } from '../../config/database';
import { IUser } from '../../interfaces/user.interface';
import { RowDataPacket } from 'mysql2';

export const getAllUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = `
      SELECT
        u.ID,
        u.LOGIN,
        u.PERSON_ID,
        u.ROLE_ID,
        p.NAME,
        p.EMAIL,
        p.AGE,
        r.DESCRIPTION as ROLE
      FROM USER u
      INNER JOIN PERSON p ON u.PERSON_ID = p.ID
      INNER JOIN ROLE r ON u.ROLE_ID = r.ID
      WHERE u.ID > ?
      LIMIT ?
    `;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [users] = await pool.execute<(IUser & RowDataPacket)[]>(query, [0, limit]);

    if (!users.length) {
      res.status(404).json({ message: 'Nenhum usuário encontrado' });
      return;
    }

    res.status(200).json({
      page,
      limit,
      total: users.length,
      data: users
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({
      error: 'Erro interno no servidor',
      message: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};
