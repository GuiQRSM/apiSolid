//  ponto de entrada da aplicação, onde o servidor Fastify é configurado e as rotas são registradas

import fastify from 'fastify'
import { appRoutes } from './http/routes.ts'
import { ZodError } from 'zod'

export const app = fastify()

app.register(appRoutes)

// manipulador global de erros para capturar erros de validação do Zod
app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
