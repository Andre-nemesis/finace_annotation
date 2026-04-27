import type { Request, NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserService } from "../../services/UserService";

export class UserController {
    constructor(private readonly userService: UserService) { }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.findAll()
            return res.json(users).status(StatusCodes.OK)
        } catch (err) {
            next(err)
        }
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = String(req.params.id)
            const user = await this.userService.findById(id);
            return res.json(user).status(StatusCodes.OK)
        } catch (err) {
            next(err)
        }
    }

    findByEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email = String(req.params.email)
            const user = await this.userService.findByEmail(email)
            return res.json(user).status(StatusCodes.OK)
        } catch (err) {
            next(err)
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const users = await this.userService.createUser(data);
            return res.json(users).status(StatusCodes.CREATED)
        } catch (err) {
            next(err)
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = String(req.params.id);
            const data = req.body;
            const users = await this.userService.update(id, data);
            return res.json(users).status(StatusCodes.OK)
        } catch (err) {
            next(err)
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = String(req.params.id);
            await this.userService.delete(id)
            return res.status(StatusCodes.NO_CONTENT).send()
        } catch (err) {
            next(err)
        }
    }
}