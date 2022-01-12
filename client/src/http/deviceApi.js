import {$authHost, $host} from "./index";

export const createType = async (type) =>
    await $authHost.post('api/type', type) //TODO: think about permission auth or !auth

export const fetchType = async () =>
    await $host.get('api/type')


