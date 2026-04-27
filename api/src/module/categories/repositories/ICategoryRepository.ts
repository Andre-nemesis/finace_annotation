import type { IRepository } from "../../../core/repositories/IRepository";
import type { CreateCategoriesDTO, UpdateCategoriesDTO } from "../dto/CategoriesDTO";
import type { Category,Expense } from "../../../../generated/prisma/client";

export interface ICategoryRepository extends IRepository<Category, CreateCategoriesDTO, UpdateCategoriesDTO> {
    getExpenses(id:string): Promise<{expenses:Expense[]}|null>;
}