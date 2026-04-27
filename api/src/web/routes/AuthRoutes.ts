import { authController } from './../../core/container/container';
import { Router } from "express";

const authRoutes = Router();

authRoutes.post('/login', authController.login);

export default authRoutes;