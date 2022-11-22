import  Axios  from 'axios'
import {FastifyInstance} from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function authRoutes(fastify: FastifyInstance){

    fastify.post('/user/auth/google', async (request, reply)=>{
        
        try {

            const createUserBody = z.object({
                access_token: z.string()
            })

            const { access_token } = createUserBody.parse(request.body)

            const userResponse = await Axios.get('https://www.googleapis.com/oauth2/v2/userinfo',{
                headers:{
                    Authorization: `Bearer ${access_token}`
                }
            })

            const userData = userResponse.data

            const userInfoSchema = z.object({
                id: z.string(),
                email: z.string().email(),
                name: z.string(),
                picture: z.string().url()
            })
            
            const userInfo = userInfoSchema.parse(userData)

            let user = await prisma.user.findUnique({
                where: {
                    googleId: userInfo.id,
                }
            })

            if (!user) {
                user = await prisma.user.create({
                    data:{
                        googleId: userInfo.id,
                        name: userInfo.name,
                        email: userInfo.email,
                        avatarUrl: userInfo.picture,  
                    }
                })
            }

            const token = fastify.jwt.sign({
                name: user.name,
                avatarUrl: user.avatarUrl,
            },{
                sub: user.id,
                expiresIn: '7 days'
            })

            return { token }

        } catch (error) {

            return reply.status(500).send({ error })

        }

    })

}

//clapo3cf00000btwc9ekk8upw
//clapo3cf00000btwc9ekk8upw