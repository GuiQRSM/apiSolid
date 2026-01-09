//  define as rotas da aplicação e associa os controllers apropriados

import type { FastifyInstance } from 'fastify'
import { register } from './controllers/register.ts'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}
