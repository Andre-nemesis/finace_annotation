import { userController } from './../../core/container/container';
import { Router } from "express";
import { verifyToken } from '../middlewares/auth.middleware';

const userRoutes = Router();

userRoutes.post('/create', userController.create);

userRoutes.get('/all', verifyToken, userController.findAll);
userRoutes.get('/find/email/:email', verifyToken, userController.findByEmail);
userRoutes.get('/find/id/:id', verifyToken, userController.findById);

userRoutes.put('/update/:id', verifyToken, userController.update);

userRoutes.delete('/delete/:id', verifyToken, userController.delete);

export default userRoutes;