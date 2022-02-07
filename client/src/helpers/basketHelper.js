import {addToBasket, deleteFromBasket} from "../http/basketAPI";
import {toast} from "react-toastify";

export function addItem(id) {
    addToBasket(id).then(() => toast.success("Успішно додано", {toastId: id}))
}

/**
 * @returns {Promise<void>}
 * @param props  {{total: *, setTotalPrice: *, deleteFromBasketList: *, count: number, device: *}}
 */
export async function deleteDevice(props) {
    const {device, deleteFromBasketList, total, setTotalPrice, count} = props
    await deleteFromBasket({deviceId: device.id})
    deleteFromBasketList(device.id)
    setTotalPrice(total - device.price * count)
    toast.error(`${device.name} видалено`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
}

export function calculateDevicesPrice(data) {
    return data.devices.reduce((total, device) =>
        total + device.price, 0)
}

