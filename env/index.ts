import 'dotenv/config'
import { z } from 'zod'

const envScena = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev')
})