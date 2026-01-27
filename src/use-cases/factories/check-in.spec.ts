import { InMemoryCheckInsReposity } from '@/repositories/in-memory/in-memory-check-ins-repository.ts'
import { expect, describe, it, beforeEach } from 'vitest'
import { CheckinUseCase } from '../check-in.ts'

describe('Register CheckIn', () => {
  let CheckInsRepository: InMemoryCheckInsReposity
  let sut: CheckinUseCase

  // configuração antes de cada teste chamando instance do repositório em memória e do use-case de check-in
  beforeEach(() => {
    CheckInsRepository = new InMemoryCheckInsReposity()
    sut = new CheckinUseCase(CheckInsRepository)
  })

  // teste para verificar se é possível registrar um novo check-in
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    // asserção para garantir que o check-in foi criado com um ID válido
    expect(checkIn.id).toEqual(expect.any(String))
  })

  // teste para verificar se não é possível registrar dois check-ins no mesmo dia
  it('should be not able to check in twice in the same day', async () => {
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    // asserção para garantir que o check-in não foi criado novamente no mesmo dia
    expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})

// teste para verificar se o check-in é criado corretamente
// criação de uma instância do use-case de check-in com um repositório de check-ins falso (mock)
// execução do use-case de check-in com dados de check-in de teste
// verificação se o check-in foi criado corretamente
// asserção para garantir que o check-in foi criado corretamente
