const {Basket, BasketDevice} = require("../models/models");
const ApiError = require('../error/ApiError')


class BasketController {

    async getAndCountAll(req, res) {
        const {basketId} = req.body
        const basket = await Basket.findOne({where: {id: basketId}})
        const devices = await BasketDevice.findAndCountAll({where: {basketId: basket.id}})
        return res.json({devices})
    }

    async addToBasket(req, res, next) {
        const {deviceId, basketId} = req.body
        let device = await BasketDevice.create({deviceId: deviceId, basketId: basketId})
        if (!device)
            return next(ApiError.BadRequest("Помилка. Неможливо додати!"))
        res.json({device})
    }

    async deleteFromBasket(req, res, next) {
        const {deviceId, basketId} = req.body
        let device = await BasketDevice.destroy({where: {deviceId: deviceId, basketId: basketId}})
        if (!device)
            return next(ApiError.BadRequest("Помилка. Неможливо видалити!"))
        res.json({message: "Продукт успішно видлалено!"})
    }

}

module.exports = new BasketController()
