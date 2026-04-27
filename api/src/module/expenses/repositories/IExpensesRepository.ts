import type { IRepository } from "../../../core/repositories/IRepository";
import type { CreateExpenseDTO, UpdateExpenseDTO } from "../dto/ExpensesDTO";
import type { Expense } from "../../../../generated/prisma/client";

export interface IExpensesRepository extends IRepository<Expense, CreateExpenseDTO, UpdateExpenseDTO> {
    getUsersExpenses(userId: string): Promise<Expense[]>
    getCategoriesExpenses(categoryId: string): Promise<Expense[]>
}