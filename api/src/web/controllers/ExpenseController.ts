import type { Request, NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ExpenseService } from "../../services/ExpenseService";

export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService) { }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const expenses = await this.expenseService.findAll();
            res.json(expenses).send(StatusCodes.OK);
        } catch (err) {
            next(err);
        }
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = String(req.params.id)
            const expense = await this.expenseService.findById(id);
            res.json(expense).send(StatusCodes.OK);
        } catch (err) {
            next(err);
        }
    }

    getUserExpenses = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = String(req.params.userId)
            const expenses = await this.expenseService.getUserExpenses(id);
            res.json(expenses).send(StatusCodes.OK);
        } catch (err) {
            next(err);
        }
    }

    getCategoryExpenses = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = String(req.params.userId)
            const expenses = await this.expenseService.getCategoriesExpenses;
            res.json(expenses).send(StatusCodes.OK);
        } catch (err) {
            next(err);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const expenses = await this.expenseService.create(data);
            res.json(expenses).send(StatusCodes.OK);
        } catch (err) {
            next(err);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = String(req.params.id);
            const data = req.body;
            const expenses = await this.expenseService.update(id,data);
            res.json(expenses).send(StatusCodes.OK);
        } catch (err) {
            next(err);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = String(req.params.id);
            const expenses = await this.expenseService.delete(id);
            res.json(expenses).send(StatusCodes.OK);
        } catch (err) {
            next(err);
        }
    }
}