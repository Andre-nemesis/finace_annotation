import { UserRepository } from "../../repositories/UserRepository";
import { UserService } from "../../services/UserService";
import { UserController } from "../../web/controllers/UserController";
import { AuthService } from "../../services/AuthService";
import { AuthController } from '../../web/controllers/AuthController'

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
export const userController = new UserController(userService);

const authService = new AuthService(userRepository);
export const authController = new AuthController(authService);