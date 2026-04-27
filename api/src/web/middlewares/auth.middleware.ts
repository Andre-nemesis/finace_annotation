import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader)
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Token não fornecido' })

  const [scheme, token] = authHeader.split(' ')

  if (scheme !== 'Bearer' || !token)
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token inválido' })

  try {
    const secret = process.env.JWT_SECRET!
    const decoded = jwt.verify(token, secret)
    // req.user = decoded
    next()
  } catch {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Falha na autenticação do token' })
  }
}