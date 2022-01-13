import {$authHost, $host} from "./index";

export const createType = async (type) =>
    await $authHost.post('api/type', type) //TODO: think about permission auth or !auth

export const fetchType = async () => {
    const {data} = await $host.get('api/type')
    return data
}
export const createBrand = async (brand) =>
    await $authHost.post('api/brand', brand) //TODO: think about permission auth or !auth

export const fetchBrand = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const createDevice = async (device) =>
    await $authHost.post('api/device', device) //TODO: think about permission auth or !auth

export const fetchDevice = async () => {
    const {data} = await $host.get('api/device')
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get(`api/device/${id}`)
    return data
}

export const createRating = async (rating) => {
    const {data} = await $authHost.post('api/rating')
    return data
}

export const fetchRating = async (id) => {
    const {data} = await  $host.get(`api/rating/${id}`)
    return {data}
}
