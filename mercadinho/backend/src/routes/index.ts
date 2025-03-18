import { Router } from 'express';
import usuarioRoutes from './usuarios/usuario.routes';

const router = Router();

router.use('/usuarios', usuarioRoutes);

export default router;
