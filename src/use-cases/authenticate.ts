import type { UsersRepository } from '@/repositories/users-repositories.ts'

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}
}
