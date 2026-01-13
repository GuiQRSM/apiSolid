//  separação de responsabilidades da lógica de negócio em um use-case para reaproveitar a lógica de registro de usuário

import { hash } from 'bcryptjs'
import { type UsersRepository } from '@/repositories/users-repositories.ts'
import { UserAlreadyExistsError } from './errors/user-already-exists.ts'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

//  use-case responsável pela lógica de registro de usuário
// dependencia reversal: o use-case depende de uma abstração (repositório de usuários) e não de uma implementação concreta
export class RegisterUseCase {
  // injeção de dependência do repositório de usuários
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    //  verificação se já existe um usuário com o mesmo e-mail
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    //  instanciação do repositório de usuários

    this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}

//  O DIP propõe que as camadas mais altas de uma aplicação não dependam diretamente das camadas mais baixas, mas sim de uma abstração entre elas. Isso permite maior flexibilidade e facilidade de manutenção do código
// Ao depender de uma abstração (repositório de usuários), o use-case não está acoplado a uma implementação específica, facilitando testes e futuras mudanças na forma como os dados são armazenados ou recuperados
