const {Order, OrderDevice, OrderConversation, Device} = require('../models/models')
const ApiError = require("../error/ApiError")

class OrderController {
    async create(req, res, next) {
        try {
            const {deviceId, userId} = req.body
            const {id} = await Order.findOne({where: {userId: userId}})
            const orderDevice = await OrderConversation.create({
                deviceId: deviceId,
                orderId: id,
                shopperId: req.user.id
            })
            if (!orderDevice) {
                return next(ApiError.BadRequest("Помилка. Неможливо додати!"))
            }
            res.json({orderDevice})
        } catch (e) {
            return next(ApiError.BadRequest(e.message))
        }
    }

    async destroy(req, res, next) {

    }

    async getAll(req, res, next) {
        try {
            const {id} = await Order.findOne({where: {userId: req.user.id}})
            if (!id)
                return next(ApiError.BadRequest("Замовлень немає"))
            const orderDevices = await OrderConversation.findAll({where: {orderId: id}})
            const devices = await Device.findAll({
                where: {
                    id: orderDevices.map(device => device.deviceId)
                }
            })
            const order = devices.map(device =>
                new orderDto(device, orderDevices.find(x => x.deviceId === device.id).shopperId))
            if (!devices)
                return next(ApiError.BadRequest("Замовлень немає"))
            return res.json({count: order.length, devices: order})
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }
}

class orderDto {
    constructor(device, shopperId) {
        this.id = device.id
        this.name = device.name
        this.price = device.price
        this.img = device.img
        this.typeId = device.typeId
        this.brandId = device.brandId
        this.rating = device.rating
        this.shopperId = shopperId
    }
}

module.exports = new OrderController();
