import type { User } from "../../../../generated/prisma/client"; 
import type { CreateUserDTO, UpdateUserDTO } from "../dto/userDto";
import type { IRepository } from "../../../core/repositories/IRepository";

export interface IUserRepository extends IRepository<User, CreateUserDTO, UpdateUserDTO>{
    findByEmail(email: string): Promise<User | null>
}