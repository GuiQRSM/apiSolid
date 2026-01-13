//  responsável por lidar apenas com as requisições HTTP de registro de usuário

import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { RegisterUseCase } from '@/use-cases/register.ts'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.ts'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists.ts'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    //  instanciação do repositório de usuários
    const prismaUsersRepository = new PrismaUsersRepository()
    //  instanciação do use-case de registro de usuário com injeção de dependência do repositório
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
