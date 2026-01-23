//  repositório de usuários usando Prisma ORM para interagir com o banco de dados

import { prisma } from '@/lib/prisma.ts'
import { Prisma, type User } from '@prisma/client'
import type { UsersRepository } from '../users-repositories.ts'

// implementação concreta do repositório de usuários
// seguindo a abstração definida na interface UsersRepository
export class PrismaUsersRepository implements UsersRepository {
  // método para encontrar um usuário pelo ID
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  // método para encontrar um usuário pelo e-mail
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  // método para criar um novo usuário
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }
}
