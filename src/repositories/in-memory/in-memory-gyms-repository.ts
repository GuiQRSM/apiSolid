import type { Gym } from '@prisma/client'
import type { GymRepository } from '../gyms-repositories.ts'

// implementação em memória do repositório de academias para fins de teste
export class InMemoryGymsRepository implements GymRepository {
  public items: Gym[] = []

  // procurar uma academia pelo ID
  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
