import type { UsersRepository } from '@/repositories/users-repositories.ts'
import type { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts'

// Definição da interface para os dados de entrada do caso de uso de obtenção do perfil do usuário
interface GetUserProfileUseCaseRequest {
  UserId: string
}

// Definição da interface para os dados de saída do caso de uso de obtenção do perfil do usuário
interface AuthenticateUSeCaseResponse {
  user: User
}

// Caso de uso para obtenção do perfil do usuário
export class GetUserProfileUseCase {
  // injeção de dependência do repositório de usuários
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    UserId,
  }: GetUserProfileUseCaseRequest): Promise<AuthenticateUSeCaseResponse> {
    const user = await this.usersRepository.findById(UserId)

    // verifica se o id usuário existe
    if (!user) {
      throw new ResourceNotFoundError()
    }

    // verificação bem-sucedida
    return {
      user,
    }
  }
}
