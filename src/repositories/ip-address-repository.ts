import {FastifyInstance} from 'fastify';
import {ResultSetHeader} from "@fastify/mysql";

export class IpAddressRepository {

    async getAllIpAddresses(fastify: FastifyInstance) {
        const [rows] = await fastify.mysql.query('SELECT * FROM ip_addresses');
        return rows;
    }

    async getIpAddressById(fastify: FastifyInstance, id: string) {
        const [rows] = await fastify.mysql.query('SELECT * FROM ip_addresses WHERE id = ?', [id]);
        return rows;
    }

    async createIpAddress(
        fastify: FastifyInstance,
        label: string,
        ip_address: string,
        comments: string,
        added_by_user_id: number
    ) {
        const [result] = await fastify.mysql.query(
            'INSERT INTO ip_addresses (label, ip_address, comments, added_by_user_id) VALUES (?, ?, ?, ?)',
            [label, ip_address, comments, added_by_user_id]
        ) as [ResultSetHeader, unknown];

        return result;
    }

    async updateIpAddress(
        fastify: FastifyInstance,
        id: string,
        updateData: Partial<{ label: string; ip_address: string; comments: string }>
    ) {
        const fields: string[] = [];
        const values: any[] = [];

        if (updateData.label) {
            fields.push('label = ?');
            values.push(updateData.label);
        }
        if (updateData.ip_address) {
            fields.push('ip_address = ?');
            values.push(updateData.ip_address);
        }
        if (updateData.comments) {
            fields.push('comments = ?');
            values.push(updateData.comments);
        }

        if (!fields.length) {
            throw new Error('No data to update');
        }

        const [result] = await fastify.mysql.query(
            `UPDATE ip_addresses
             SET ${fields.join(', ')}
             WHERE id = ?`,
            [...values, id]
        ) as [ResultSetHeader, unknown];

        return result;
    }

    async deleteIpAddress(fastify: FastifyInstance, id: string) {
        const [result] = await fastify.mysql.query(
            'DELETE FROM ip_addresses WHERE deleted_at IS NULL AND id = ?',
            [id]
        ) as [ResultSetHeader, unknown];

        return result;
    }
}