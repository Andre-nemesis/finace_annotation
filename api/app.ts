import express from 'express'
import helmet from 'helmet';
import { errorMiddleware } from './src/web/middlewares/error.middleware';
import cors from './src/web/middlewares/cors.middleware';
import { requestLogger } from './src/web/middlewares/loggler.middleware';
import userRoutes from './src/web/routes/UserRoutes';
import authRoutes from './src/web/routes/AuthRoutes';
import categoriesRoutes from './src/web/routes/CategoryRoutes';
import expensesRoutes from './src/web/routes/ExpensesRoutes';
const app: express.Application = express();

app.use(helmet());
app.use(cors);
app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/v1/users',userRoutes);
app.use('/api/v1/auth',authRoutes);
app.use('/api/v2/categories',categoriesRoutes);
app.use('/api/v2/expenses',expensesRoutes);

app.use(errorMiddleware);

export default app;