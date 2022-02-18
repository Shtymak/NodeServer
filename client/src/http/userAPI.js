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

export const fetchUserDevices = async () => {
    const {data} = await $authHost.get('api/user/own')
    return data
}

export const getAllUsers = async () => {
    const {data} = await $authHost.get('api/user/users')
    return data
}

export const deleteUser = async (id) => {
    await $authHost.delete('api/user/delete', {data: {id: id}})
}


