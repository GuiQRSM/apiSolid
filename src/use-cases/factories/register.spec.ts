import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from '../register.ts'
import { compare } from 'bcryptjs'
import { InMemoryUsersReposity } from '@/repositories/in-memory/in-memory-users-repositorie.ts'
import { UserAlreadyExistsError } from '../errors/user-already-exists.ts'

describe('Registet UseCase', () => {
  let UsersRepository: InMemoryUsersReposity
  let sut: RegisterUseCase

  // configuração antes de cada teste chamando instance do repositório em memória e do use-case de registro
  beforeEach(() => {
    UsersRepository = new InMemoryUsersReposity()
    sut = new RegisterUseCase(UsersRepository)
  })

  // teste para verificar se é possível registrar um novo usuário
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'User test',
      email: 'usertest@example.com',
      password: '123456',
    })

    // asserção para garantir que o usuário foi registrado com um ID
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
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
    const email = 'testeemail@gmail.com'

    await sut.execute({
      name: 'User test',
      email,
      password: '123456',
    })

    expect(() =>
      sut.execute({
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
