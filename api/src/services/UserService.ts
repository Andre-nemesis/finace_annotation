import type { User } from "../../generated/prisma/client";
import type { CreateUserDTO, UpdateUserDTO } from "../module/users/dto/userDto";
import AppError from "../core/exceptions/AppError";
import { StatusCodes } from "http-status-codes";
import type { UserRepository } from "../repositories/UserRepository";
import { genSalt, hash } from "bcrypt-ts";

export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async findAll(): Promise<User[] | null> {
        const users = await this.userRepository.findAll();
        if (!users || users.length === 0) {
            throw new AppError("Nenhum usuário encontrado", StatusCodes.NOT_FOUND);
        }
        return users;
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new AppError("Usuário não encontrado", StatusCodes.NOT_FOUND);
        }
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Usuário não encontrado", StatusCodes.NOT_FOUND);
        }
        return user;
    }
    
    async createUser(data: CreateUserDTO): Promise<User | null> {
        const hasThisEmail = await this.userRepository.findByEmail(data.email);
        if(hasThisEmail){
            throw new AppError("Já existe um usuário com este e-mail", StatusCodes.CONFLICT)
        }
        const salt = await genSalt(10);
        data.password = await hash(data.password, salt);
        return await this.userRepository.create(data);
    }

    async update(id: string, data: UpdateUserDTO): Promise<User | null> {
        if(data.email){
            const userHasThisEmail = await this.userRepository.findByEmail(data.email);
            if(userHasThisEmail?.id != id){
                throw new AppError("Já existe um usuário com este e-mail", StatusCodes.CONFLICT)
            }
        }
        if (data.password) {
            const salt = await genSalt(10);
            data.password = await hash(data.password, salt);
        }
        return await this.userRepository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}