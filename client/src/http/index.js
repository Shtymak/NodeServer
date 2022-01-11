import axios from "axios";
const path = 'http://localhost:5000/'
const $host = axios.create({
    baseURL: path
})

const $authHost = axios.create({
    baseURL: path
})

const authInterceptor = config=> {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}

