import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersReposity } from '@/repositories/in-memory/in-memory-users-repositorie.ts'
import { AuthenticateUseCase } from '../authenticate.ts'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './invalid-credentials-error.ts'

// teste para o caso de uso de autenticação
describe('Authenticate UseCase', () => {
  let UsersRepository: InMemoryUsersReposity
  let sut: AuthenticateUseCase

  // configuração antes de cada teste chamando instance do repositório em memória e do use-case de autenticação
  beforeEach(() => {
    UsersRepository = new InMemoryUsersReposity()
    sut = new AuthenticateUseCase(UsersRepository)
  })

  // teste para verificar se é possível autenticar um usuário com credenciais válidas
  it('should be able to authenticate', async () => {
    await UsersRepository.create({
      name: 'User test',
      email: 'usertest@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'usertest@example.com',
      password: '123456',
    })

    await expect(user.id).toEqual(expect.any(String))
  })

  // teste para verificar se não é possível autenticar com emial errada
  it('should be able to authenticate with wrong email', async () => {
    // criando um usuário no repositório em memória
    await expect(() =>
      sut.execute({
        email: 'usertest@exam,ple.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  // teste para verificar se não é possível autenticar com senha errada
  it('should be able to authenticate with wrong password', async () => {
    // criando um usuário no repositório em memória
    await UsersRepository.create({
      name: 'User test',
      email: 'usertest@example.com',
      password_hash: await hash('123456', 6),
    })

    // tentando autenticar com a senha errada
    await expect(() =>
      sut.execute({
        email: 'usertest@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
