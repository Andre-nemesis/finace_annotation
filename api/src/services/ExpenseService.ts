import type { Expense } from "../../generated/prisma/client";
import type { CreateExpenseDTO,UpdateExpenseDTO } from "../module/expenses/dto/ExpensesDTO";
import AppError from "../core/exceptions/AppError";
import { StatusCodes } from "http-status-codes";
import type { ExpenseRepository } from "../repositories/ExpenseRepository";

export class ExpenseService {
    constructor(protected readonly expenseRepository: ExpenseRepository){}

    async findAll():Promise<Expense[] | null>{
        const expenses = await this.expenseRepository.findAll();
        if(!expenses || expenses.length===0){
            throw new AppError("Nenhuma despesa encontrada", StatusCodes.NOT_FOUND);
        }

        return expenses;
    }

    async findById(id:string):Promise<Expense|null>{
        const expense = await this.expenseRepository.findById(id);
        if(!expense){
            throw new AppError("Nenhuma despesa encontrada", StatusCodes.NOT_FOUND);
        }
        return expense;
    }

    async getUserExpenses(userId:string):Promise<Expense[]|null>{
        const expense = await this.expenseRepository.getUsersExpenses(userId);
        if(!expense){
            throw new AppError("Nenhuma despesa encontrada para este usuário", StatusCodes.NOT_FOUND);
        }
        return expense;
    }

    async getCategoriesExpenses(cateogoryId:string):Promise<Expense[]|null>{
        const expense = await this.expenseRepository.getCategoriesExpenses(cateogoryId);
        if(!expense){
            throw new AppError("Nenhuma categoria encontrada para esta despesa", StatusCodes.NOT_FOUND);
        }
        return expense;
    }

    async create(data:CreateExpenseDTO): Promise<Expense|null>{
        if(data.amount<=0){
            throw new AppError("O valor da despesa não pode ser negativo!", StatusCodes.NOT_ACCEPTABLE);
        }
        return await this.expenseRepository.create(data);
    }

    async update(id:string,data:CreateExpenseDTO): Promise<Expense|null>{
        if(data.amount<=0){
            throw new AppError("O valor da despesa não pode ser negativo!", StatusCodes.NOT_ACCEPTABLE);
        }
        return await this.expenseRepository.update(id,data);
    }

    async delete(id:string):Promise<void>{
        await this.expenseRepository.delete(id);
    }
}