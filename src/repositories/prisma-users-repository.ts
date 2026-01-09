//  repositório de usuários usando Prisma ORM para interagir com o banco de dados

import { prisma } from '@/lib/prisma.ts'
import { Prisma } from '@prisma/client'

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }
}
