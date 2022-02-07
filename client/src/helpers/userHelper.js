import {SHOP_ROUTE} from "../utils/consts";
import {check, fetchUserDevices} from "../http/userAPI";

export const logOut = (user, history) => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.setItem('token', '')
    history.push(SHOP_ROUTE)
}
export const loadUser = (user) => check().then(data => {
    user.setUser(data)
    user.setIsAuth(true)
})
export const loadUserDevices = (user) =>
    fetchUserDevices().then(data => user.setDevices(data.rows || []))
