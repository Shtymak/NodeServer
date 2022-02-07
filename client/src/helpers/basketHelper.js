import {addToBasket, deleteFromBasket} from "../http/basketAPI";
import {toast} from "react-toastify";
import {toastProps} from "../utils/style";

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
    toast.error(`${device.name} видалено`, toastProps);
}

export function calculateDevicesPrice(data) {
    return data.devices.reduce((total, device) =>
        total + device.price, 0)
}

