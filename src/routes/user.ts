import {FastifyInstance} from 'fastify'
import { prisma } from '../lib/prisma'

import { authenticate } from '../plugin/authenticate'

export async function userRoutes(fastify: FastifyInstance){

    fastify.get('/user/me', {
        onRequest: [authenticate]
    }, async (request)=>{
        return {user: request.user}
    })

}

