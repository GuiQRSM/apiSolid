import type { CheckIn } from '@prisma/client'
import type { CheckinsRepository } from '@/repositories/check-ins-repository.ts'

// Definição da interface para os dados de entrada do caso de uso de check-in
interface CheckinUseCaseRequest {
  userId: string
  gymId: string
}

// Definição da interface para os dados de saída do caso de uso de check-in
interface CheckinUseCaseResponse {
  checkIn: CheckIn
}

// Implementação do caso de uso de check-in
export class CheckinUseCase {
  constructor(private checkinsRepository: CheckinsRepository) {}

  // Método para executar o caso de uso de check-in
  async execute({
    userId,
    gymId,
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    // Criação do check-in utilizando o repositório de check-ins
    const checkIn = await this.checkinsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
