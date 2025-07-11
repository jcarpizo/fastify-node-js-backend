export class IpAddressSchema {

    static getAllIpAddresses = {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'integer' },
                                    label: { type: 'string' },
                                    ip_address: { type: 'string', format: 'ipv4' },
                                    comments: { type: 'string' },
                                    added_by_user_id: { type: 'integer' },
                                    updated_by_user_id: { type: 'integer' },
                                    deleted_at: { type: 'string', format: 'date-time' },
                                    created_at: { type: 'string', format: 'date-time' },
                                    updated_at: { type: 'string', format: 'date-time' },
                                },
                                required: ['id', 'label', 'ip_address', 'created_at', 'updated_at'],
                            },
                        },
                    },
                    required: ['message', 'data'],
                },
            },
        },
    };

    static createIpAddress = {
        schema: {
            body: {
                type: 'object',
                required: ['label', 'ip_address', 'comments', 'added_by_user_id'],
                properties: {
                    label: { type: 'string' },
                    ip_address: { type: 'string' },
                    comments: { type: 'string' },
                    added_by_user_id: { type: 'integer' }
                }
            },
            response: {
                201: {
                    type: 'object',
                    required: ['message', 'data'],
                    properties: {
                        message: { type: 'string' },
                        data: {
                            type: 'object',
                            required: ['label', 'ip_address', 'comments', 'added_by_user_id'],
                            properties: {
                                label: { type: 'string' },
                                ip_address: { type: 'string' },
                                comments: { type: 'string' },
                                added_by_user_id: { type: 'integer' }
                            }
                        }
                    }
                }
            }
        }
    };

}