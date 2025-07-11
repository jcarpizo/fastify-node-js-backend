import fp from 'fastify-plugin';
import {FastifyPluginAsync} from 'fastify';
import mysql, {MySQLPromisePool} from '@fastify/mysql';

declare module 'fastify' {
    interface FastifyInstance {
        mysql: MySQLPromisePool
    }
}

const mysqlPlugin: FastifyPluginAsync = async (fastify) => {
    fastify.register(mysql, {
        promise: true,
        connectionString: 'mysql://root:J@8p3r15@localhost/web-auth-service-db',
    });
};

export default fp(mysqlPlugin);
