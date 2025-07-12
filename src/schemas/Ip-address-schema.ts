export class IpAddressSchema {

    private static ipAddressProperties = {
        id: { type: 'integer' },
        label: { type: 'string' },
        ip_address: { type: 'string', format: 'ipv4' },
        comments: { type: 'string' },
        added_by_user_id: { type: 'integer' },
        updated_by_user_id: { type: ['integer', 'null'] },
        deleted_at: { type: ['string', 'null'], format: 'date-time' },
        created_at: { type: ['string', 'null'], format: 'date-time' },
        updated_at: { type: ['string', 'null'], format: 'date-time' }
    };

    private static createIpAddressProperties = {
        label: { type: 'string' },
        ip_address: { type: 'string' },
        comments: { type: 'string' },
        added_by_user_id: { type: 'integer' }
    };

    private static metaResultSchema = {
        type: 'object',
        required: [
            'fieldCount',
            'affectedRows',
            'insertId',
            'info',
            'serverStatus',
            'warningStatus',
            'changedRows'
        ],
        properties: {
            fieldCount: { type: 'integer' },
            affectedRows: { type: 'integer' },
            insertId: { type: 'integer' },
            info: { type: 'string' },
            serverStatus: { type: 'integer' },
            warningStatus: { type: 'integer' },
            changedRows: { type: 'integer' }
        }
    };

    static getAllIpAddresses = {
        schema: {
            response: {
                200: {
                    type: 'object',
                    required: ['message', 'data'],
                    properties: {
                        message: { type: 'string' },
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: IpAddressSchema.ipAddressProperties,
                                required: ['id', 'label', 'ip_address', 'created_at', 'updated_at']
                            }
                        }
                    }
                }
            }
        }
    };

    static getIpAddress = {
        schema: {
            response: {
                200: {
                    type: 'object',
                    required: ['message', 'data'],
                    properties: {
                        message: { type: 'string', example: 'IP Address Successfully Retrieved' },
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                required: Object.keys(IpAddressSchema.ipAddressProperties),
                                properties: IpAddressSchema.ipAddressProperties
                            }
                        }
                    }
                }
            }
        }
    };

    static createIpAddress = {
        schema: {
            body: {
                type: 'object',
                required: Object.keys(IpAddressSchema.createIpAddressProperties),
                properties: IpAddressSchema.createIpAddressProperties
            },
            response: {
                201: {
                    type: 'object',
                    required: ['message', 'data'],
                    properties: {
                        message: { type: 'string' },
                        data: {
                            type: 'object',
                            required: Object.keys(IpAddressSchema.createIpAddressProperties),
                            properties: IpAddressSchema.createIpAddressProperties
                        }
                    }
                }
            }
        }
    };

    static updateIpAddress = {
        schema: {
            params: {
                type: 'object',
                properties: { id: { type: 'string' } },
                required: ['id']
            },
            body: {
                type: 'object',
                required: ['label', 'ip_address', 'comments'],
                properties: {
                    label: { type: 'string' },
                    ip_address: { type: 'string' },
                    comments: { type: 'string' }
                }
            },
            response: {
                200: {
                    type: 'object',
                    required: ['message', 'result'],
                    properties: {
                        message: { type: 'string' },
                        result: IpAddressSchema.metaResultSchema
                    }
                }
            }
        }
    };

    static deleteIpAddress = {
        schema: {
            params: {
                type: 'object',
                properties: { id: { type: 'string' } },
                required: ['id']
            },
            body: {
                type: 'object',
                required: ['label', 'ip_address', 'comments'],
                properties: {
                    label: { type: 'string' },
                    ip_address: { type: 'string' },
                    comments: { type: 'string' }
                }
            },
            response: {
                200: {
                    type: 'object',
                    required: ['message', 'result'],
                    properties: {
                        message: { type: 'string' },
                        result: IpAddressSchema.metaResultSchema
                    }
                }
            }
        }
    };
}
