import express from 'express';
import cors from 'cors';
import routes from './routes';
import usuarioRoutes from './routes/usuarios/usuario.routes';
import productRoutes from './routes/produtos/produto.routes';

const app = express();

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use('/api', routes);

// rotas com prefixo /api/usuarios
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/produtos', productRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'API rodando...' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

export default app;
