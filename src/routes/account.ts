import {FastifyInstance} from 'fastify'
import { z } from 'zod'
import {prisma} from '../lib/prisma'

import { authenticate } from '../plugin/authenticate'

export async function accountRoutes(fastify:FastifyInstance){

    fastify.post('/account/create', {
        onRequest:[authenticate]
    }, async (request, reply)=>{
        try {

            const accountInfoSchema = z.object({
                name: z.string(),
                saldo: z.number(),
                iconUrl: z.string(),
            })

            const accountInfo = accountInfoSchema.parse(request.body)

            await prisma.account.create({
                data: {
                    ...accountInfo,
                    userId: request.user.sub
                }
            })

            return reply.status(201).send({
                message: 'Account created successfull!!'
            })

        } catch (error) {
            return reply.status(500).send({error})
        }
    })

    fastify.get('/accounts', {
        onRequest: [authenticate]
    }, async (request, reply)=>{
        try {
            const accounts = await prisma.account.findMany({
                where:{
                    userId: request.user.sub
                }
            })

            return {accounts}

        } catch (error) {
            
            return reply.status(500).send({error})

        }
    })
}