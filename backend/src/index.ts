import express from 'express';
import cors from 'cors';
import clientsRouter from './routes/clients';
import estimatesRouter from './routes/estimates';
import usersRouter from './routes/users';
import { authenticate } from './middleware/authenticate';

const app = express();
const port = process.env.PORT || 3001;

// Habilitar CORS para todas las rutas
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from BuildMas Backend!');
});

// Aplicar el middleware de autenticación a todas las rutas de la API
app.use('/api', authenticate);

app.use('/api/users', usersRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/estimates', estimatesRouter);

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});