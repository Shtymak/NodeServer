const {Basket, BasketDevice, Device} = require("../models/models");
const ApiError = require('../error/ApiError')
const mailService = require('../services/MailService')

class BasketController {

    async getAndCountAll(req, res, next) {
        const basket = await Basket.findOne({where: {userId: req.user.id}});
        if (!basket) {
            return next(ApiError.BadRequest("Кошик не знайдено"))
        }
        const basketDevices = await BasketDevice.findAndCountAll({
            where: {
                basketId: basket.id
            }
        });
        const ids = basketDevices.rows.map(device => device.deviceId)
        const {count} = basketDevices
        const devices = await Device.findAll({
            where: {
                id: ids
            }
        })
        if (!devices) {
            return next(ApiError.BadRequest("Кошик порожній"))
        }
        return res.json({count, devices})
    }

    async addToBasket(req, res, next) {
        const {id} = await Basket.findOne({where: {userId: req.user.id}});
        const {deviceId} = req.body
        const device = await BasketDevice.create({
            deviceId: deviceId,
            basketId: id
        });
        if (!device) {
            return next(ApiError.BadRequest("Помилка. Неможливо додати!"))
        }
        res.json({device})
    }

    async deleteFromBasket(req, res, next) {
        const {deviceId} = req.body
        const {id} = await Basket.findOne({
            where: {
                userId: req.user.id
            }
        });
        const device = await BasketDevice.destroy({
            where: {
                deviceId: deviceId,
                basketId: id
            }
        })
        if (!device) {
            return next(ApiError.BadRequest("Помилка. Неможливо видалити!"))
        }
        res.json({message: "Продукт успішно видлалено!"})
    }

    async order(req, res, next) {
        const {
            totalPrice,
            totalCount,
            devices
        } = req.body
        const {user} = req
        try {
            await mailService.sendMail(user.email, {
                totalPrice,
                totalCount,
                devices
            })
            const {id} = await Basket.findOne({
                where: {
                    userId: user.id
                }
            });
            await BasketDevice.destroy({
                where: {
                    basketId: id
                }
            })
            res.json({message: "Успішно доставлено!"})
        } catch (e) {
            next(ApiError.Internal("Неможливо достиавити повідомлення"))
        }
    }
}

module.exports = new BasketController()
