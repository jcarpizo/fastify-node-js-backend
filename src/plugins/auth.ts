import {FastifyInstance} from 'fastify'
import fastifyAuth from '@fastify/auth'
import {verifyApiKey} from '../middleware/api-key-guard'

export default async function authPlugin(app: FastifyInstance) {
    await app.register(fastifyAuth)

    app.get('/protected', {
        preHandler: app.auth([verifyApiKey]),
        handler: async (req, reply) => {
            reply.send({message: 'Access granted with API key'})
        }
    })
}
