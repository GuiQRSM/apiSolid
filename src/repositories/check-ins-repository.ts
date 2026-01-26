import { Prisma, type CheckIn } from '@prisma/client'

// Definição da interface do repositório de check-ins
export interface CheckinsRepository {
  create(data: Prisma.CheckInCreateInput): Promise<CheckIn>
}
