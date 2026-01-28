import type { CheckIn, Prisma } from '@prisma/client'
import type { CheckinsRepository } from '../check-ins-repository.ts'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

// implementação em memória do repositório de check-ins para fins de teste
export class InMemoryCheckInsReposity implements CheckinsRepository {
  public items: CheckIn[] = []

  async findByUsesrIdOnDate(userId: string, date: Date) {
    // definir o início e o fim do dia para a data fornecida
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkinOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      // verificar se a data do check-in está dentro do intervalo do dia
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })
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
