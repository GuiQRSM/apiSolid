import { expect, describe, it } from 'vitest'
import { InMemoryUsersReposity } from '@/repositories/in-memory/in-memory-users-repositorie.ts'
import { AuthenticateUseCase } from '../authenticate.ts'

// teste para o caso de uso de autenticação
describe('Authenticate UseCase', () => {
  //
  it('should be able to authenticate', async () => {
    // instância do repositório de usuários em memória
    const UsersRepository = new InMemoryUsersReposity()
    const registerUseCase = new AuthenticateUseCase(UsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'User test',
      email: 'usertest@example.com',
      password: '123456',
    })

    //
    expect(user.id).toEqual(expect.any(String))
  })
})
