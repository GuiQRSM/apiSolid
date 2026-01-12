//  separação de responsabilidades da lógica de negócio em um use-case para reaproveitar a lógica de registro de usuário

import { prisma } from '@/lib/prisma.ts'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('E-mail already registered.')
    }

    //  instanciação do repositório de usuários

    this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
