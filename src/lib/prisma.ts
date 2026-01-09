// objeto de conexão com o banco de dados usando Prisma ORM

import { PrismaClient } from '@prisma/client'
import { env } from 'env/index.ts'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
console.log('Ok')
