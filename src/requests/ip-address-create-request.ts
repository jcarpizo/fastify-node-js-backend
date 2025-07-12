import {RouteGenericInterface} from "fastify";

export default interface CreateIpRequest extends RouteGenericInterface {
    Body: {
        label: string;
        ip_address: string;
        comments: string;
        added_by_user_id: number;
    };
}