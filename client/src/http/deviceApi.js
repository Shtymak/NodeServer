import {$authHost, $host} from "./index";

export const createType = async (type) =>
    await $authHost.post('api/type', type) //TODO: think about permission auth or !auth

export const fetchType = async () =>{
    const {data} = await $host.get('api/type')
    return data
}
export const createBrand = async (brand) =>
    await $authHost.post('api/brand', brand) //TODO: think about permission auth or !auth

export const fetchBrand = async () =>{
    const {data} = await $host.get('api/brand')
    return data
}



