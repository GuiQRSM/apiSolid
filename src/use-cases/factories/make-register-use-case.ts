import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.ts'
import { RegisterUseCase } from '../register.ts'

// factory para criar uma instância do use-case de registro de usuário
export function makeRegisterUseCase() {
  //  instanciação do repositório de usuários
  const prismaUsersRepository = new PrismaUsersRepository()
  //  instanciação do use-case de registro de usuário com injeção de dependência do repositório
  const registerUseCase = new RegisterUseCase(prismaUsersRepository)

  return registerUseCase
}
