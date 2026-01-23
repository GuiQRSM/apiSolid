import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersReposity } from '@/repositories/in-memory/in-memory-users-repositorie.ts'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from '../get-user-profile.ts'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.ts'

// suíte de testes para o caso de uso de obtenção do perfil do usuário
describe('Get User Profile UseCase', () => {
  let UsersRepository: InMemoryUsersReposity
  let sut: GetUserProfileUseCase

  // configuração antes de cada teste chamando instance do repositório em memória e do caso de uso de obtenção do perfil do usuário
  beforeEach(() => {
    UsersRepository = new InMemoryUsersReposity()
    sut = new GetUserProfileUseCase(UsersRepository)
  })

  // teste para verificar se é possível autenticar um usuário com credenciais válidas
  it('should be able to get user profile', async () => {
    const createdUser = await UsersRepository.create({
      name: 'User test',
      email: 'usertest@example.com',
      password_hash: await hash('123456', 6),
    })

    // executando o caso de uso de obtenção do perfil do usuário
    const { user } = await sut.execute({
      UserId: createdUser.id,
    })

    await expect(user.id).toEqual(expect.any(String))
    await expect(user.name).toEqual('User test')
  })

  // teste para verificar se não é possível autenticar com id errado
  it('should be able to get user profile with wrong id', async () => {
    // criando um usuário no repositório em memória
    await expect(() =>
      sut.execute({
        UserId: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
