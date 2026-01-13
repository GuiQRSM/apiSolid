//  ponto de entrada da aplicação, onde o servidor Fastify é configurado e as rotas são registradas

import fastify from 'fastify'
import { appRoutes } from './http/routes.ts'
import { ZodError } from 'zod'
import { env } from 'env/index.ts'

export const app = fastify()

app.register(appRoutes)

// manipulador global de erros para capturar erros de validação do Zod
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  // log de erros detalhados em ambientes que não sejam de produção
  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
