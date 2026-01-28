import type { Gym } from '@prisma/client'

// definição da interface do repositório de academias
export interface GymRepository {
  findById(id: string): Promise<Gym | null>
}
