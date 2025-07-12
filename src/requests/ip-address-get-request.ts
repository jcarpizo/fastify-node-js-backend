import {RouteGenericInterface} from "fastify";

export default interface IpAddressRequest extends RouteGenericInterface {
    Params: { id: string };
}