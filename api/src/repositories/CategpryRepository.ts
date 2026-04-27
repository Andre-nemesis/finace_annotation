import type { Category, Expense } from "../../generated/prisma/client";
import prisma from "../lib/prisma";
import type { CreateCategoriesDTO, UpdateCategoriesDTO } from "../module/categories/dto/CategoriesDTO";
import type { ICategoryRepository } from "../module/categories/repositories/ICategoryRepository";

export class CategoryRepository implements ICategoryRepository {
    async findAll(): Promise<Category[]> {
        return await prisma.category.findMany();
    }

    async findById(id: string): Promise<Category | null> {
        return await prisma.category.findUnique({
            where: { id }
        })
    }

    async getExpenses(id:string): Promise<{expenses:Expense[]} | null> {
        return await prisma.category.findUnique({
            where: {id},
            select: {expenses:true}
        })
    }

    async create(data: CreateCategoriesDTO): Promise<Category> {
        return await prisma.category.create({data});
    }

    async update(id: string, data: UpdateCategoriesDTO): Promise<Category> {
        return await prisma.category.update({
            where: {id},
            data
        })
    }

    async delete(id: string): Promise<void> {
        await prisma.category.delete({
            where: {id}
        })
    }
}