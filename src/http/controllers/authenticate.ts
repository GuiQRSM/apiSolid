//  responsável por lidar apenas com as requisições HTTP de registro de usuário

import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.ts'
import { AuthenticateUseCase } from '@/use-cases/authenticate.ts'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error.ts'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    //  instanciação do repositório de usuários
    const prismaUsersRepository = new PrismaUsersRepository()
    // instanciação do use-case de autenticação com injeção de dependência do repositório
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }

  return reply.status(200).send()
}
