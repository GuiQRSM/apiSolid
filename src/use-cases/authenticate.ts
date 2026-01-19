import type { UsersRepository } from '@/repositories/users-repositories.ts'

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
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUSeCaseResponse> {}
}
