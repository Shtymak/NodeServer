const ApiError = require('../error/ApiError')
const {Device, User, Rating} = require('../models/models')
const {where} = require("sequelize");

class RatingController {
    async create(req, res, next) {
        const {deviceId, rate} = req.body
        const userId = req.user.id
        const candidate = await Rating.findOne({where: {userId, deviceId}})
        if (candidate)
            return next(ApiError.Forbidden("Цей продукт вже оцінено!"))
        const rating = await Rating.create({deviceId: deviceId, userId: userId, rate: rate})
        res.json({rating})
    }

    async getOne(req, res, next) {
        const {id} = req.params
        const ratingData = await Rating.findAndCountAll({where: {deviceId: id}})
        res.json({count: ratingData.count, rates: ratingData.rows})
    }
}

module.exports = new RatingController()
