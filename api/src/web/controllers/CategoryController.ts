import type { Request, NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CategoryService } from "../../services/CategoryService";

export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await this.categoryService.findAll();
            res.json(categories).status(StatusCodes.OK)
        } catch (err) {
            next(err)
        }
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = String(req.params.id);
            const category = await this.categoryService.findById(id);
            res.json(category).status(StatusCodes.OK)
        } catch (err) {
            next(err)
        }
    }

    getExpenses = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = String(req.params.id);
            const expenses = await this.categoryService.getExpenses(id);
            res.json(expenses).status(StatusCodes.OK)
        } catch (err) {
            next(err)
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const cateogry = await this.categoryService.create(data);
            res.json(cateogry).status(StatusCodes.CREATED)
        } catch (err) {
            next(err)
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = String(req.params.id);
            const data = req.body;
            const category = await this.categoryService.update(id,data);
            res.json(category).status(StatusCodes.CREATED)
        } catch (err) {
            next(err)
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = String(req.params.id);
            await this.categoryService.delete(id);
            res.status(StatusCodes.NO_CONTENT).send()
        } catch (err) {
            next(err)
        }
    }
    
}