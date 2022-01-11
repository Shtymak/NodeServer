import {$host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {
        email,
        password,
        role: "USER"
    })
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {
        email,
        password
    })
    return jwt_decode(data.token)
}

export const check = async () => await $host.post('api/auth')

