import {$host} from "./index";

export const registration = async (email, password) => await $host.post('api/user/registration', {email, password, role: "USER"})

export const login = async (email, password) => await $host.post('api/user/login', {email, password})

export const check = async () => await $host.post('api/auth')

