import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/client.js'
import { StatusCodes } from 'http-status-codes'
import type { Request, Response, NextFunction } from 'express'
import AppError from '../../core/exceptions/AppError'


export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      details: err.details,
    })
  }

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2002')
      return res.status(StatusCodes.CONFLICT).json({ message: 'Registro já existente' })

    if (err.code === 'P2025')
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Registro não encontrado' })
  }

  if (err instanceof PrismaClientValidationError)
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Dados inválidos enviados ao banco' })

  console.error('Erro inesperado:', err)
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro inesperado no sistema.' })
}