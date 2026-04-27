import type { Category, Expense } from "../../generated/prisma/client";
import prisma from "../lib/prisma";
import type { CreateExpenseDTO, UpdateExpenseDTO } from "../module/expenses/dto/ExpensesDTO";
import type { IExpensesRepository } from "../module/expenses/repositories/IExpensesRepository";

export class ExpenseRepository implements IExpensesRepository {
    async findAll(): Promise<Expense[]> {
        return await prisma.expense.findMany();
    }

    async findById(id: string): Promise<Expense | null> {
        return await prisma.expense.findUnique({ where: { id } });
    }

    async getUsersExpenses(userId: string): Promise<Expense[]> {
        return await prisma.expense.findMany({ where: { userId } });
    }

    async getCategoriesExpenses(categoryId: string): Promise<Expense[]> {
        return await prisma.expense.findMany({ where: { categoryId } })
    }

    async create(data: CreateExpenseDTO): Promise<Expense> {
        return await prisma.expense.create({ data });
    }

    async update(id: string, data: UpdateExpenseDTO): Promise<Expense> {
        return await prisma.expense.update({
            where: { id },
            data
        })
    }

    async delete(id: string): Promise<void> {
        await prisma.expense.delete({ where: { id } });
    }
}