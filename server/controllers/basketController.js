const {Basket, User, BasketDevice, Device} = require("../models/models");
const ApiError = require('../error/ApiError')
const {where} = require("sequelize");

class BasketController {

    async getOne(req, res) {
        //const token = generateJwt(req.user.id, req.user.email, req.user.role)
        const basket = await Basket.findOne({where: {userId: req.user.id}})
        return res.json({basket})
    }

    async addToBasket(req, res, next){
        // const {deviceId, basketId} = req.body
        // let device = await BasketDevice.create({deviceId: deviceId, basketId: basketId})
        // if(!device)
        //     return next(ApiError.BadRequest("Помилка. Такого товару немає!"))
        // res.json({device})
        //TODO: Need refactor of logic
    }

    async deleteFromBasket(){
        //TODO: Need logic
    }

}

module.exports = new BasketController()
//TODO Перевірити працездатність
