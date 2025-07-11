import {FastifyInstance} from 'fastify';
import {IpAddressController} from '../controllers/ip-address-controller';
import fastifyAuth from "@fastify/auth";
import {verifyApiKey} from "../middleware/api-key-guard";
import {IpAddressSchema} from "../schema/Ip-address-schema";

const ipController = new IpAddressController();

async function ipAddressAPI(app: FastifyInstance, _opts: any) {
    await app.register(fastifyAuth)

    const authMiddleware = app.auth([verifyApiKey])

    app.post('/ip-addresses', {
        ...authMiddleware,
        handler: ipController.createIpAddress.bind(ipController),
        schema: IpAddressSchema.createIpAddress.schema,
    });

    app.get('/ip-addresses', {
        ...authMiddleware,
        handler: ipController.getAllIpAddress.bind(ipController),
        schema: IpAddressSchema.getAllIpAddresses.schema,
    });

    app.get('/ip-addresses/:id', {
        ...authMiddleware,
        handler: ipController.getIpAddress.bind(ipController),
    });

    app.patch('/ip-addresses/:id', {
        ...authMiddleware,
        handler: ipController.updateIpAddress.bind(ipController)
    });

    app.delete('/ip-addresses/:id', {
        ...authMiddleware,
        handler: ipController.deleteIpAddress.bind(ipController)
    });
}

export default ipAddressAPI;