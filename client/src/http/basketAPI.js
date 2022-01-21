import {$authHost} from "./index";

const basketPath = "api/basket"

export const addToBasket = async (deviceId) => {
    await $authHost.post(basketPath, {deviceId})
}

export const fetchBasket = async () => {
    const {data} = await $authHost.get(basketPath)
    return data
}


export const deleteFromBasket = async (deviceId) => {
    await $authHost.delete(basketPath, {data: deviceId})
}
