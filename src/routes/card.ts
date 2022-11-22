import {FastifyInstance} from 'fastify'
import {prisma} from '../lib/prisma'
import {string, z} from 'zod'

import { authenticate } from '../plugin/authenticate'

export async function cardRoutes(fastify : FastifyInstance){
    
    fastify.post('/card/create', {
        onRequest: [authenticate]
    }, async (request, reply)=>{
        try {
            
            const cardInfoSchema = z.object({
                name: z.string(),
                limit: z.number(),
                dueDate: z.number(),
                closingDate: z.number(),
                accountId: z.string(),
            })

            const cardInfo = cardInfoSchema.parse(request.body)

            await prisma.card.create({
                data:{              
                    ...cardInfo,
                    userId: request.user.sub
                } 
            })

            return reply.status(201).send({
                message: 'Card created successefull!!'
            })

        } catch (error) {
            return reply.status(500).send({error: String(error)})
        }
    })

    fastify.patch('/card/:id/shelve', {
        onRequest: [authenticate]
    }, async (request, reply)=>{
        try {

            const cardParamsSchema = z.object({
                id: z.string()
            })
            const {id} = cardParamsSchema.parse(request.params)


            await prisma.card.updateMany({
                data:{
                    isArchived: true
                },
                where: {
                    id,
                    userId: request.user.sub
                }
            })

            return reply.status(200).send({
                message: 'Card archived successfull!!'
            })
            
        } catch (error) {
            return reply.status(500).send({error: String(error)})
        }
    })

    fastify.delete('/card/:id/delete', {
        onRequest: [authenticate]
    }, async (request, reply)=>{
        try {

            const cardParamsSchema = z.object({
                id: z.string()
            })
            const {id} = cardParamsSchema.parse(request.params)

            await prisma.cardExpense.deleteMany({
                where:{
                    cardId: id
                }
            })

            await prisma.card.deleteMany({
                where:{
                    id,
                    userId: request.user.sub
                }
            })

            return reply.status(200).send({
                message: 'Card delete successfull!!'
            })

        } catch (error) {
            return reply.status(500).send({error: String(error)})
        }
    })

    fastify.get('/cards', {
        onRequest: [authenticate]
    }, async (request, reply)=>{
        try {
            
            const cards = await prisma.card.findMany({
                where:{
                    userId: request.user.sub
                }
            })

            return {cards}


        } catch (error) {
            
            return reply.status(500).send({error: String(error)})

        }
    })

}