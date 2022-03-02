import {Order, OrderDevice} from "../models/models"
import ApiError from "../error/ApiError";

class OrderController {
    async create(req, res, next) {
        const {id} = await Order.findOne({where: {userId: req.user.id}})
        const {deviceId} = req.body
        const orderDevice = await OrderDevice.create({deviceId: deviceId, orderId: id})
        if (!orderDevice) {
            return next(ApiError.BadRequest("Помилка. Неможливо додати!"))
        }
        res.json({orderDevice})
    }

    async destroy(req, res, next) {

    }

    async getAll(req, res, next) {
        const {userId} = req.body
        const {rows, count} = await Order.findAndCountAll({where: {userId}})
        res.json({rows, count})
    }
}

module.exports = new OrderController();
