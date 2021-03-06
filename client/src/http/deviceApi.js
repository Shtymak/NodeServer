import {$authHost, $host} from "./index";

const routes = {
    type: 'api/type',
    brand: 'api/brand',
    device: 'api/device',
    rating: 'api/rating'
}

export const createType = async (type) =>
    await $authHost.post(routes.type, type) //TODO: think about permission auth or !auth

export const fetchType = async () => {
    const {data} = await $host.get(routes.type)
    return data
}
export const createBrand = async (brand) =>
    await $authHost.post(routes.brand, brand) //TODO: think about permission auth or !auth

export const fetchBrand = async () => {
    const {data} = await $host.get(routes.brand)
    return data
}

export const createDevice = async (device) =>
    await $authHost.post(routes.device, device) //TODO: think about permission auth or !auth

export const fetchDevice = async (brandId, typeId) => {
    const {data} = await $host.get(routes.device, {params: {brandId: brandId, typeId: typeId}})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get(`api/device/${id}`)
    return data
}

export const createRating = async (rating) => {
    await $authHost.post(routes.rating, {deviceId: rating.deviceId, rate: rating.rate})
}

export const fetchRating = async (id) => {
    const {data} = await $host.get(`api/rating/${id}`)
    return {data}
}

export const removeDevice = async (device) => {
    const {data} = await $authHost.delete(`api/device`, {data: {id: device.id, userId: device.userId}})
    return data
}

//TODO: fetch basket
