import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from '../register.ts'
import { compare } from 'bcryptjs'
import { InMemoryUsersReposity } from '@/repositories/in-memory/in-memory-users-repositorie.ts'
import { UserAlreadyExistsError } from './user-already-exists.ts'

describe('Registet UseCase', () => {
  it('should hash user password upon registration', async () => {
    // instância do repositório de usuários em memória
    const UsersRepository = new InMemoryUsersReposity()
    const registerUseCase = new RegisterUseCase(UsersRepository)

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

  // teste para verificar se não é possível registrar dois usuários com o mesmo email
  it('should not be able to register with same email twice', async () => {
    // instância do repositório de usuários em memória
    const UsersRepository = new InMemoryUsersReposity()
    const registerUseCase = new RegisterUseCase(UsersRepository)

    const email = 'testeemail@gmail.com'

    await registerUseCase.execute({
      name: 'User test',
      email,
      password: '123456',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'User test',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
// teste para verificar se a senha do usuário é corretamente hasheada durante o registro
// criação de uma instância do use-case de registro com um repositório de usuários falso (mock)
// execução do use-case de registro com dados de usuário de teste
// verificação se a senha armazenada está corretamente hasheada usando a função compare do bcryptjs
// asserção para garantir que a senha foi hasheada corretamente
