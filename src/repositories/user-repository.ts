import {FastifyInstance} from 'fastify';

export class UserRepository {

    async findUserByUsername(fastify: FastifyInstance, email: string) {
        const [rows]: any = await fastify.mysql.query(
            'SELECT * FROM users WHERE email = ? LIMIT 1',
            [email]
        )
        return rows[0]
    }
}