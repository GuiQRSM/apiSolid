import type { CheckIn, Prisma } from '@prisma/client'
import type { CheckinsRepository } from '../check-ins-repository.ts'
import { randomUUID } from 'node:crypto'

// implementação em memória do repositório de check-ins para fins de teste
export class InMemoryCheckInsReposity implements CheckinsRepository {
  public items: CheckIn[] = []

  async findByUsesrIdOnDate(userId: string, date: Date) {
    const checkinOnSameDate = this.items.find(
      (checkIn) => checkIn.user_id === userId,
    )

    if (!checkinOnSameDate) {
      return null
    }

    return checkinOnSameDate
  }

  // criar um novo check-in
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      vslidate_at: data.vslidate_at ? new Date(data.vslidate_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}

// o repositório mantém uma lista em memória de check-ins
// o método create adiciona um novo check-in à lista e retorna o check-in criado
