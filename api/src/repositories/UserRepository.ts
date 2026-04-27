import type { User } from "../../generated/prisma/client";
import prisma from "../lib/prisma";
import type { CreateUserDTO, UpdateUserDTO } from "../module/users/dto/userDto";
import type { IUserRepository } from "../module/users/repositories/IUserRepository";

export class UserRepository implements IUserRepository {
    async findAll(): Promise<User[]> {
        return await prisma.user.findMany({
        });
    }

    async findById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { id },
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { email },
        })
    }

    async create(data: CreateUserDTO): Promise<User> {
        return await prisma.user.create({
            data
        })
    }

    async update(id: string, data: UpdateUserDTO): Promise<User> {
        return await prisma.user.update({
            where: { id },
            data
        })
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where: { id }
        })
    }
}