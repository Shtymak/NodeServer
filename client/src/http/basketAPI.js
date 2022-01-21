import {$authHost} from "./index";

export const addToBasket = async (deviceId) => {
    await $authHost.post('api/basket', {deviceId})
}

export const fetchBasket = async () => {
    const {data} = await $authHost.get('api/basket')
    return data
}


export const deleteFromBasket = async (deviceId) => {
    await $authHost.delete('api/basket', {data: deviceId})
}
