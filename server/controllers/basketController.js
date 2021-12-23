const {Basket, User} = require("../models/models");
const ApiError = require('../error/ApiError')
const {where} = require("sequelize");

class BasketController {

    async create(req, res, next) {
        try {
            const {userId} = req.body
            const user = await User.findOne({where: {id: userId}})
            let basket = await Basket.findOne({where: {userId: user.id}});
            if (basket) {
                return res.json(basket)
            } else {
                basket = await Basket.create({userId: user.id})
            }
            return res.json(basket)
        }
        catch (e) {
            return res.json(ApiError.BadRequest("Помилка кошика! Неможливо створити чи знайти кошик!"))
        }
    }

    async getOne(req, res) {
        const {userId} = req.params
        let basket = await Basket.findOne({where: {userId: userId}})
        return res.json(basket)
    }
}

module.exports = new BasketController()
//TODO Перевірити працездатність
