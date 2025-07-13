export class AuthSchema {

    static login = {
        schema: {
            body: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                },
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        token: { type: 'string' },
                    },
                },
            },
        },
    }

    static verifyLogin = {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        user: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                email: { type: 'string' },
                            },
                        },
                        token: { type: 'string' },
                    },
                },
            },
        },
    }

    static logout = {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
            },
        },
    }
}
