import Fastify from "fastify";
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/user";
import { accountRoutes } from "./routes/account";
import { cardRoutes } from "./routes/card";


async function bootstrap() {

    const fastify = Fastify({logger: true,})

    await fastify.register(cors, {origin: true,})
    await fastify.register(jwt, {
        secret: 'SIMPLEMONEY15479638'
    })

    fastify.register(userRoutes)
    fastify.register(authRoutes)
    fastify.register(accountRoutes)
    fastify.register(cardRoutes)

    await fastify.listen({port: 9999, host: '0.0.0.0'})
}

bootstrap()