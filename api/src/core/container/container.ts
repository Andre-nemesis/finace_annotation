import { UserRepository } from "../../repositories/UserRepository";
import { UserService } from "../../services/UserService";
import { UserController } from "../../web/controllers/UserController";
import { AuthService } from "../../services/AuthService";
import { AuthController } from '../../web/controllers/AuthController'
import { CategoryRepository } from "../../repositories/CategpryRepository";
import { CategoryService } from "../../services/CategoryService";
import { CategoryController } from "../../web/controllers/CategoryController";
import { ExpenseRepository } from "../../repositories/ExpenseRepository";
import { ExpenseService } from "../../services/ExpenseService";
import { ExpenseController } from "../../web/controllers/ExpenseController";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
export const userController = new UserController(userService);

const authService = new AuthService(userRepository);
export const authController = new AuthController(authService);

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
export const categoryController = new CategoryController(categoryService);

const expenseRepository = new ExpenseRepository();
const expenseService = new ExpenseService(expenseRepository);
export const expenseController = new ExpenseController(expenseService);