import type { UserRepository } from '../repositories/UserRepository.js'
import AppError from '../core/exceptions/AppError.js'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt-ts'

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(email: string, password: string) {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email))
      throw new AppError('Email inválido', StatusCodes.BAD_REQUEST)

    const user = await this.userRepository.findByEmail(email)

    const invalidCredentialsError = new AppError(
      'Email ou senha incorretos',
      StatusCodes.UNAUTHORIZED
    )

    if (!user) throw invalidCredentialsError

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) throw invalidCredentialsError

    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('JWT_SECRET não definido')

    const token = jwt.sign(
      { sub: String(user.id), name: user.name },
      secret,
      { expiresIn: '8h' }
    )

    return {
      token,
      token_type: 'Bearer',
    }
  }
}