import { categoryController } from './../../core/container/container';
import { Router } from "express";
import { verifyToken } from '../middlewares/auth.middleware';

const categoriesRoutes = Router();

categoriesRoutes.post('/create', categoryController.create);

categoriesRoutes.get('/all', verifyToken, categoryController.findAll);
categoriesRoutes.get('/expenses/:id', verifyToken, categoryController.getExpenses);
categoriesRoutes.get('/find/id/:id', verifyToken, categoryController.findById);

categoriesRoutes.put('/update/:id', verifyToken, categoryController.update);

categoriesRoutes.delete('/delete/:id', verifyToken, categoryController.delete);

export default categoriesRoutes;