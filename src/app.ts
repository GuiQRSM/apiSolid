//  ponto de entrada da aplicação, onde o servidor Fastify é configurado e as rotas são registradas

import fastify from 'fastify'
import { appRoutes } from './http/routes.ts'

export const app = fastify()

app.register(appRoutes)
