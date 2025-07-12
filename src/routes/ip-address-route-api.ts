import { FastifyInstance } from 'fastify';
import fastifyAuth from '@fastify/auth';
import { IpAddressController } from '../controllers/ip-address-controller';
import { verifyApiKey } from '../middlewares/api-key-guard';
import { IpAddressSchema } from '../schemas/Ip-address-schema';

const ipController = new IpAddressController();

async function ipAddressRouteAPI(app: FastifyInstance, _opts: any) {
    await app.register(fastifyAuth)

    const authMiddleware = app.auth([verifyApiKey])

    app.post('/ip-addresses', {
        preHandler: authMiddleware,
        handler: ipController.createIpAddress.bind(ipController),
        schema: IpAddressSchema.createIpAddress.schema,
    });

    app.get('/ip-addresses', {
        preHandler: authMiddleware,
        handler: ipController.getAllIpAddress.bind(ipController),
        schema: IpAddressSchema.getAllIpAddresses.schema,
    });

    app.get('/ip-addresses/:id', {
        preHandler: authMiddleware,
        handler: ipController.getIpAddress.bind(ipController),
        schema: IpAddressSchema.getIpAddress.schema,
    });

    app.patch('/ip-addresses/:id', {
        preHandler: authMiddleware,
        handler: ipController.updateIpAddress.bind(ipController),
        schema: IpAddressSchema.updateIpAddress.schema,
    });

    app.delete('/ip-addresses/:id', {
        preHandler: authMiddleware,
        handler: ipController.deleteIpAddress.bind(ipController),
        schema: IpAddressSchema.deleteIpAddress.schema,
    });
}

export default ipAddressRouteAPI;