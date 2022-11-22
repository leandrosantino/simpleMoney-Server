import { FastifyRequest } from "fastify";

export async function authenticate(requests: FastifyRequest){
    await requests.jwtVerify()
}