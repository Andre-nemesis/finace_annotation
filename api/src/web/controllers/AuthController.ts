import type { Request, NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "../../services/AuthService";

export class AuthController {
    constructor(private readonly AuthService: AuthService) { }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const token = await this.AuthService.login(email, password)
            return res.json(token).status(StatusCodes.OK)
        } catch (err) {
            next(err)
        }
    }
}