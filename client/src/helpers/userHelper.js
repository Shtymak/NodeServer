import {SHOP_ROUTE} from "../utils/consts";
import {check, fetchUserDevices, login, registration} from "../http/userAPI";
import {toast} from "react-toastify";

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

export async function deleteItem(props) {
    const {device, removeItem} = props
    let deleted = window.confirm("Дійсно хочете видалити?")
    if (deleted) {
        await removeItem(device)
        toast.error(`${device.name} видалено`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    } else {
        toast.success("Ваш товар у безпеці 💖", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }
}

/**
 * @param props {{isLogin: boolean, inputs: {password: string, email: string}, history: History<LocationState>, user}}
 * @returns {Promise<void>}
 */
export async function enter(props) {
    try {
        const {isLogin, history, user, inputs} = props
        const {email, password} = inputs
        if (isLogin === false) {
            await registration(email, password)
        } else {
            await login(email, password)
        }
        user.setUser(user)
        user.setIsAuth(true)
        history.push(SHOP_ROUTE)
    } catch (error) {
        const message = error.response.data.message
        alert(message)
    }
}
