import {FastifyRequest, FastifyReply} from 'fastify';
import {UserRepository} from "../repositories/user-repository";
import bcrypt from 'bcrypt'
import {addTokenToBlacklist} from "../utils/token-blacklist";

const userRepository = new UserRepository();

export class AuthUserController {

    async loginUser(request: FastifyRequest, reply: FastifyReply) {
        const {email, password} = request.body as { email: string, password: string };
        try {
            const user = await userRepository.findUserByUsername(request.server, email);

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return reply.status(401).send({message: 'Invalid username or password'});
            }

            const token = request.server.jwt.sign({id: user.id, email: user.email}, {expiresIn: '15m'});

            reply.code(200).header('Location', '/user').send({
                message: 'Login successful',
                token,
            });

        } catch (err) {
            console.error(err)
            reply.status(500).send({error: 'Login failed', details: err});
        }
    }

    async verifyLogin(request: FastifyRequest, reply: FastifyReply) {
        const authHeader = request.headers.authorization;

        const token = authHeader?.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : null;

        reply.code(200).send({
            message: 'User is authenticated',
            user: request.user,
            token: token || null,
        });
    }

    async logoutUser(request: FastifyRequest, reply: FastifyReply) {
        const authHeader = request.headers.authorization;
        const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

        if (!token) {
            return reply.status(400).send({ message: 'No token provided' });
        }

        addTokenToBlacklist(token);

        reply.status(200).send({ message: 'Successfully logged out' });
    }
}