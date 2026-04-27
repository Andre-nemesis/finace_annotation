import type { Category, Expense } from "../../generated/prisma/client";
import type { CreateCategoriesDTO,UpdateCategoriesDTO } from "../module/categories/dto/CategoriesDTO";
import AppError from "../core/exceptions/AppError";
import { StatusCodes } from "http-status-codes";
import type { CategoryRepository } from "../repositories/CategpryRepository";

export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async findAll(): Promise<Category[] | null>{
        const categories = await this.categoryRepository.findAll();
        if(!categories || categories.length === 0){
            throw new AppError("Nenhuma categoria encontrada!", StatusCodes.NOT_FOUND);
        }
        return categories;
    }

    async findById(id:string):Promise<Category|null>{
        const category = await this.categoryRepository.findById(id);
        if(!category){
            throw new AppError("Nenhuma categoria encontrada!", StatusCodes.NOT_FOUND);
        }
        return category;
    }

    async getExpenses(id:string): Promise<{expenses:Expense[]}|null>{
        const expenses = await this.categoryRepository.getExpenses(id);
        if(!expenses||expenses.expenses.length===0){
            throw new AppError("Nenhuma despesa encontrada!", StatusCodes.NOT_FOUND);
        }
        return expenses;
    }

    async create(data: CreateCategoriesDTO): Promise<Category|null>{
        return await this.categoryRepository.create(data);
    }

    async update(id:string, data: UpdateCategoriesDTO): Promise<Category|null>{
        return await this.categoryRepository.update(id,data);
    }

    async delete(id:string): Promise<void>{
        await this.categoryRepository.delete(id);
    }

}