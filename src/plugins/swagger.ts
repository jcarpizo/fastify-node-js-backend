import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';

export default fp(async (fastify: FastifyInstance) => {
    fastify.register(swagger, {
        openapi: {
            info: {
                title: 'API Docs',
                version: '1.0.0',
            },
            servers: [{ url: 'http://localhost:3000' }],
            components: {
                securitySchemes: {
                    apiKey: {
                        type: 'apiKey',
                        name: 'x-api-key',
                        in: 'header',
                    },
                },
            },
            security: [{ apiKey: [] }],
        },
    });

    // Register Swagger UI
    fastify.register(swaggerUi, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'list',
        },
    });
});