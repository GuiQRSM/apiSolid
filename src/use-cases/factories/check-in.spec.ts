import { InMemoryCheckInsReposity } from '@/repositories/in-memory/in-memory-check-ins-repository.ts'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckinUseCase } from '../check-in.ts'

describe('Register CheckIn', () => {
  let CheckInsRepository: InMemoryCheckInsReposity
  let sut: CheckinUseCase

  // configuração antes de cada teste chamando instance do repositório em memória e do use-case de check-in
  beforeEach(() => {
    CheckInsRepository = new InMemoryCheckInsReposity()
    sut = new CheckinUseCase(CheckInsRepository)

    // configuração do uso de timers falsos para manipulação de datas nos testes
    vi.useFakeTimers()
  })

  afterEach(() => {
    // restauração do uso de timers reais após cada teste
    vi.useRealTimers()
  })

  // teste para verificar se é possível registrar um novo check-in
  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2009, 6, 8, 13, 0, 0)) // definindo a data e hora do mock para 8 de julho de 2009, 13:00:00

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    console.log(checkIn.created_at)

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
