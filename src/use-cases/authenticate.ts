import type { UsersRepository } from '@/repositories/users-repositories.ts'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.ts'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUSeCaseResponse {}

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
  }
}
