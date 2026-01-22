import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.ts'
import { AuthenticateUseCase } from '../authenticate.ts'

// fábrica para criar uma instância do use-case de autenticação
export function makeAuthenticateUseCase() {
  //  instanciação do repositório de usuários
  const prismaUsersRepository = new PrismaUsersRepository()
  // instanciação do use-case de autenticação com injeção de dependência do repositório
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

  return authenticateUseCase
}
