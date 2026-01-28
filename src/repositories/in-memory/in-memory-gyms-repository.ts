import type { Gym } from '@prisma/client'
import type { GymRepository } from '../gyms-repositories.ts'

// implementação em memória do repositório de academias para fins de teste
export class InMemoryGymsRepository implements GymRepository {
  public items: Gym[] = []
}
