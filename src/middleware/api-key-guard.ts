import {FastifyRequest, FastifyReply} from 'fastify'

export async function verifyApiKey(request: FastifyRequest, reply: FastifyReply) {
    const apiKey = request.headers['x-api-key']
    const validKeys = new Set(['3qohBUb4RJLUduNQ2ArCrokddmtmckl42vZ1g0IN'])

    if (!apiKey || !validKeys.has(apiKey as string)) {
        reply.code(401).send({error: 'Unauthorized: Invalid API key'})
    }
}