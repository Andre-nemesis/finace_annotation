import { expenseController } from "../../core/container/container";
import { Router } from "express";
import { verifyToken } from '../middlewares/auth.middleware';

const expensesRoutes = Router();

expensesRoutes.post('/create', expenseController.create);

expensesRoutes.get('/all', verifyToken, expenseController.findAll);
expensesRoutes.get('/users-expenses/:userId', verifyToken, expenseController.getUserExpenses);
expensesRoutes.get('/category-expenses/:userId', verifyToken, expenseController.getCategoryExpenses);
expensesRoutes.get('/find/id/:id', verifyToken, expenseController.findById);

expensesRoutes.put('/update/:id', verifyToken, expenseController.update);

expensesRoutes.delete('/delete/:id', verifyToken, expenseController.delete);

export default expensesRoutes;