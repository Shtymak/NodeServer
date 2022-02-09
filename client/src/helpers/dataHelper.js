/**
 * @param props {{info: Object, setInfo: function}}
 */
const {createDevice} = require("../http/deviceApi");

/**
 * @param props {{info, setInfo}}
 */
export function addInfo(props) {
    const {info, setInfo} = props
    setInfo([...info, {title: '', description: '', number: Date.now()}])
}

/**
 * @param props {{info: Object, setInfo: function, number: number}}
 */
export function removeInfo(props) {
    const {info, setInfo, number} = props
    setInfo(info.filter(i => i.number !== number))
}


/**
 * @param props {{hide: *, file: unknown, price: number, name: string, device, info: *[]}}
 */
export function addDevice(props) {
    const {name, price, file, device, info, onHide} = props
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then()
}


