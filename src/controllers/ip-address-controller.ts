import {FastifyRequest, FastifyReply, RouteGenericInterface} from 'fastify';
import {IpAddressRepository} from '../repositories/ip-address-repository';

const ipAddressRepository = new IpAddressRepository();

interface CreateIpRequest extends RouteGenericInterface {
    Body: {
        label: string;
        ip_address: string;
        comments: string;
        added_by_user_id: number;
    };
}

export class IpAddressController {

    async getAllIpAddress(request: FastifyRequest, reply: FastifyReply) {
        try {
            const data = await ipAddressRepository.getAllIpAddresses(request.server);

            reply.code(200).header('Location', '/ip-addresses').send({
                message: 'IP Address Successfully Listed',
                data,
            });

        } catch (err) {
            console.error(err);
            reply.status(500).send({error: 'Database query failed', details: err});
        }
    }

    async getIpAddress(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const data = await ipAddressRepository.getIpAddressById(request.server, request.params.id);

            reply.code(200).header('Location', '/ip-addresses').send({
                message: 'IP Address Successfully Retrieved',
                data,
            });

        } catch (err) {
            console.error(err);
            reply.status(500).send({error: 'Database query failed', details: err});
        }
    }

    async createIpAddress(
        request: FastifyRequest<CreateIpRequest>,
        reply: FastifyReply
    ) {
        const {label, ip_address, comments, added_by_user_id} = request.body

        try {
             await ipAddressRepository.createIpAddress(
                request.server,
                label,
                ip_address,
                comments,
                added_by_user_id
            );

            reply.code(201).header('Location', '/ip-addresses/${result.insertId}')
                .send({message: 'IP Address Created', data: request.body});

        } catch (err) {
            console.error(err)
            reply.status(500).send({error: 'Insert failed', details: (err as Error).message});
        }
    }

    async updateIpAddress(
        request: FastifyRequest<{
            Params: { id: string };
            Body: Partial<{ label: string; ip_address: string; comments: string }>;
        }>,
        reply: FastifyReply
    ) {
        const {id} = request.params;

        try {
            const result = await ipAddressRepository.updateIpAddress(request.server, id, request.body);

            reply
                .code(200)
                .header('Location', '/ip-addresses')
                .send({message: 'IP Address Successfully Updated', result});
        } catch (err) {
            if (err instanceof Error) {
                if (err.message === 'No data to update') {
                    reply.status(400).send({error: err.message});
                } else {
                    reply.status(500).send({error: 'Update failed', details: err.message});
                }
            } else {
                reply.status(500).send({error: 'Unknown error', details: String(err)});
            }
        }
    }

    async deleteIpAddress(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const {id} = request.params
            const result = await ipAddressRepository.deleteIpAddress(request.server, id);

            reply
                .code(200)
                .header('Location', '/ip-addresses')
                .send({message: 'IP Address Successfully Deleted', result: result});
        } catch (err) {
            reply.status(500).send({error: 'Delete failed', details: err})
        }
    }
}