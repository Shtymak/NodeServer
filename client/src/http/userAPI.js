import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

const tokenKey = 'token'
export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {
        email,
        password,
        role: "USER"
    })
    localStorage.setItem(tokenKey, data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {
        email,
        password
    })
    localStorage.setItem(tokenKey, data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem(tokenKey, data.token)
    return jwt_decode(data.token)
}

