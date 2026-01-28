import { InMemoryCheckInsReposity } from '@/repositories/in-memory/in-memory-check-ins-repository.ts'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckinUseCase } from '../check-in.ts'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.ts'

describe('Register CheckIn', () => {
  let checkInsRepository: InMemoryCheckInsReposity
  let gymsRepository: InMemoryGymsRepository
  let sut: CheckinUseCase
  // configuração antes de cada teste chamando instance do repositório em memória e do use-case de check-in
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsReposity()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckinUseCase(checkInsRepository, gymsRepository)

    // configuração do uso de timers falsos para manipulação de datas nos testes
    vi.useFakeTimers()
  })

  afterEach(() => {
    // restauração do uso de timers reais após cada teste
    vi.useRealTimers()
  })

  // teste para verificar se é possível registrar um novo check-in
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 59.1908331,
      userLongitude: -2.7043898,
    })

    // asserção para garantir que o check-in foi criado com um ID válido
    expect(checkIn.id).toEqual(expect.any(String))
  })

  // teste para verificar se não é possível registrar dois check-ins no mesmo dia
  it('should be not able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2009, 6, 8, 13, 0, 0)) // definindo a data e hora do mock para 8 de julho de 2009, 13:00:00

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 59.1908331,
      userLongitude: -2.7043898,
    })

    // asserção para garantir que o check-in não foi criado novamente no mesmo dia
    expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 59.1908331,
        userLongitude: -2.7043898,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be not able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2009, 6, 8, 13, 0, 0)) // definindo a data e hora do mock para 8 de julho de 2009, 13:00:00

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 59.1908331,
      userLongitude: -2.7043898,
    })

    // asserção para garantir que o check-in não foi criado novamente no mesmo dia
    expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 59.1908331,
        userLongitude: -2.7043898,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  // teste para verificar se é possível registrar check-ins em dias diferentes
  it('should be not able to check in twice but in the different day', async () => {
    vi.setSystemTime(new Date(2009, 6, 8, 13, 0, 0)) // definindo a data e hora do mock para 8 de julho de 2009, 13:00:00

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 59.1908331,
      userLongitude: -2.7043898,
    })

    // avançando o tempo para o próximo dia
    vi.setSystemTime(new Date(2009, 6, 9, 13, 0, 0))

    // execução do check-in no dia seguinte
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 59.1908331,
      userLongitude: -2.7043898,
    })

    // asserção para garantir que o check-in foi criado com um ID válido
    expect(checkIn.id).toEqual(expect.any(String))
  })
})

// teste para verificar se o check-in é criado corretamente
// criação de uma instância do use-case de check-in com um repositório de check-ins falso (mock)
// execução do use-case de check-in com dados de check-in de teste
// verificação se o check-in foi criado corretamente
// asserção para garantir que o check-in foi criado corretamente
