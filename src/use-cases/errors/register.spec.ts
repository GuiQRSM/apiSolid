import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from '../register.ts'
import { compare } from 'bcryptjs'

describe('Registet UseCase', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      // criação de uma instância do use-case de registro com um repositório de usuários falso (mock)
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'User test',
      email: 'usertest@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
// teste para verificar se a senha do usuário é corretamente hasheada durante o registro
// criação de uma instância do use-case de registro com um repositório de usuários falso (mock)
// execução do use-case de registro com dados de usuário de teste
// verificação se a senha armazenada está corretamente hasheada usando a função compare do bcryptjs
// asserção para garantir que a senha foi hasheada corretamente
