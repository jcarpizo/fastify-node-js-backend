import {FastifyInstance} from 'fastify';
import fastifyAuth from '@fastify/auth';
import {AuthUserController} from "../controllers/auth-user-controller";
import {AuthSchema} from "../schemas/auth-user-schema";

const authController = new AuthUserController();

async function UserRouteAPI(app: FastifyInstance, _opts: any) {
    await app.register(fastifyAuth)

    app.post('/login', {
        handler: authController.loginUser.bind(authController),
        schema: AuthSchema.login.schema
    })

    app.get('/verify-login', {
        preHandler: app.authenticate,
        handler: authController.verifyLogin.bind(authController),
        schema: AuthSchema.verifyLogin.schema
    })

    app.post('/logout', {
        preHandler: app.authenticate, // requires valid JWT
        handler: authController.logoutUser.bind(authController),
        schema: AuthSchema.logout.schema
    })
}

export default UserRouteAPI;