import type { User, Prisma } from '@prisma/client'
import type { UsersRepository } from '../users-repositories.ts'

// implementação em memória do repositório de usuários para fins de teste
export class InMemoryUsersReposity implements UsersRepository {
  public items: User[] = []

  // procurar um usuário pelo email
  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  // criar um novo usuário
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash as string,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}

// o repositório mantém uma lista interna de usuários em memória
// o método findByEmail busca um usuário pelo email na lista interna
// o método create adiciona um novo usuário à lista interna e retorna o usuário criado
