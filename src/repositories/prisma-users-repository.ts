//  repositório de usuários usando Prisma ORM para interagir com o banco de dados

import { prisma } from '@/lib/prisma.ts'
import { Prisma } from '@prisma/client'
import type { UsersRepository } from './users-repositories.ts'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }
}
