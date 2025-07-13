import { FastifyInstance } from 'fastify'
import { isTokenBlacklisted } from '../utils/token-blacklist'

import fp from 'fastify-plugin'
import fastifyJwt from '@fastify/jwt'

export default fp(async (app: FastifyInstance) => {
    app.register(fastifyJwt, {
        secret: process.env.JWT_SECRET || 'supersecret'
    })

    app.decorate('authenticate', async function (request, reply) {
        const authHeader = request.headers.authorization
        const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

        if (!token) {
            return reply.status(401).send({ message: 'Missing token' })
        }

        if (isTokenBlacklisted(token)) {
            return reply.status(401).send({ message: 'Token has been blacklisted' })
        }

        try {
            await request.jwtVerify()
        } catch (err) {
            return reply.status(401).send({ message: 'Invalid or expired token' })
        }
    })
})