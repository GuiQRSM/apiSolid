import { Prisma, type CheckIn } from '@prisma/client'

// Definição da interface do repositório de check-ins
export interface CheckinsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  // método para encontrar um check-in por usuário em uma data específica
  findByUsesrIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
