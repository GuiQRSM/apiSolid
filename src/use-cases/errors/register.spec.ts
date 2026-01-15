import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from '../register.ts'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.ts'

describe('Registet UseCase', () => {
  it('should hash user password upon registration', async () => {
    const prismaUserRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUserRepository)

    const { user } = await registerUseCase.execute({
      name: 'User test',
      email: 'usertest@example.com',
      password: '123456',
    })

    console.log(user.password_hash)
  })
})
