import {Order} from

class OrderController {
    async create(req, res, next) {

    }

    async destroy(req, res, next) {

    }

    async getOne(req, res, next) {

    }

    async getAll(req, res, next) {
        const {rows, count} = await Order.findAndCountAll()
        res.json({rows, count})
    }
}

module.exports = new OrderController();
