import { Prisma, type User } from '@prisma/client'

export interface UsersRepository {
  // definição dos métodos que o repositório de usuários deve implementar
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}

// definição da abstração do repositório de usuários
// que será implementada por repositórios concretos
