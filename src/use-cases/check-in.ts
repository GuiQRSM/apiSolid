import type { CheckIn } from '@prisma/client'
import type { CheckinsRepository } from '@/repositories/check-ins-repository.ts'
import type { GymRepository } from '@/repositories/gyms-repositories.ts'
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts'

// Definição da interface para os dados de entrada do caso de uso de check-in
interface CheckinUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

// Definição da interface para os dados de saída do caso de uso de check-in
interface CheckinUseCaseResponse {
  checkIn: CheckIn
}

// Implementação do caso de uso de check-in
export class CheckinUseCase {
  constructor(
    private checkinsRepository: CheckinsRepository,
    private gymsRepository: GymRepository,
  ) {}

  // Método para executar o caso de uso de check-in
  async execute({
    userId,
    gymId,
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    // Verificação se a academia existe
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // Verificação se o usuário já realizou um check-in no mesmo dia
    const checkInOnSameDay = await this.checkinsRepository.findByUsesrIdOnDate(
      userId,
      new Date(),
    )

    // Lançamento de erro se o usuário já tiver feito check-in hoje
    if (checkInOnSameDay) {
      throw new Error('User has already checked in today.')
    }

    // Criação do check-in utilizando o repositório de check-ins
    const checkIn = await this.checkinsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
