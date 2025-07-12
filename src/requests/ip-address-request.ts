import {RouteGenericInterface} from "fastify";

export default interface UpdateRequest extends RouteGenericInterface {
    Params: { id: string };
    Body: {
        label: string;
        ip_address: string;
        comments: string;
    };
}