import type { Request, Response, NextFunction } from 'express'
import { ZodType } from 'zod'
import { StatusCodes } from 'http-status-codes'
import AppError from '../../core/exceptions/AppError.js'

type RequestProperty = 'body' | 'params' | 'query'

const validateRequest = (schema: ZodType, property: RequestProperty) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[property])

        if (!result.success) {
            const details = result.error.issues.map(e => ({
                field: e.path.join('.'),
                message: e.message,
            }))

            return next(new AppError('Erro de validação nos dados enviados', StatusCodes.BAD_REQUEST, details))
        }

        req[property] = result.data
        next()
    }
}

export const validate = (schema: ZodType) => validateRequest(schema, 'body')
export const validateParams = (schema: ZodType) => validateRequest(schema, 'params')
export const validateQuery = (schema: ZodType) => validateRequest(schema, 'query')