import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { UserRouter } from './routes/user.route';
import { AuthRoute } from './routes/auth.route';
import { ContentRouter } from './routes/content.route';
import { CategoryRouter } from './routes/category.route';
import { RankingRouter } from './routes/ranking.route';
import { PromotionRouter } from './routes/promotion.route';
import { errorHandler } from './middlewares/error.handler';

const app = express();
const PORT = process.env.PORT;

// Middlewares - El orden de ejecución IMPORTANTE!
app.use(cors());
app.use(express.json());

// Rutas de la app
app.use('/user', UserRouter);
app.use('/auth', AuthRoute);
app.use('/content', ContentRouter);
app.use('/category', CategoryRouter);
app.use('/ranking', RankingRouter);
app.use('/promotion', PromotionRouter);

// Errores
app.use(errorHandler);

// Puerto de escucha
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto : ${PORT}`);
});
