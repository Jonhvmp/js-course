import { Router } from 'express';
import { getAllUsuarios } from '../../controllers/usuarios/usuario.controller';

const router = Router();

router.get('/', getAllUsuarios);

export default router;
