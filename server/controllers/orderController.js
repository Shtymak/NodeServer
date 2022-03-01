import {Order} from "../models/models"

class OrderController {
    async create(req, res, next) {

    }

    async destroy(req, res, next) {

    }

    async getOne(req, res, next) {

    }

    async getAll(req, res, next) {
        const {userId} = req.body
        const {rows, count} = await Order.findAndCountAll({where: {userId}})
        res.json({rows, count})
    }
}

module.exports = new OrderController();
