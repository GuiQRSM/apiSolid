import type { UsersRepository } from '@/repositories/users-repositories.ts'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.ts'
import { compare } from 'bcryptjs'
import type { User } from '@prisma/client'

// Definição da interface para os dados de entrada do caso de uso de autenticação
interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

// Definição da interface para os dados de saída do caso de uso de autenticação
interface AuthenticateUSeCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  // injeção de dependência do repositório de usuários
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUSeCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    // verifica se o usuário existe
    if (!user) {
      throw new InvalidCredentialsError()
    }

    // verifica se a senha está correta
    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    // autenticação bem-sucedida
    return {
      user,
    }
  }
}
