const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async update(req, res, next) {
        const {id, object} = req.body
        const type = await Type.findOne({where: {id}})
        if (!type) {
            return next(ApiError.Internal("Неможливо оновити неіснуючий бренд!"))
        }
        try {
            const updateMask = (object) => {
                return {
                    name: object.name
                }
            }
            await type.update(updateMask(object))
            await type.save()
            return res.json(type)
        } catch (error) {
            return res.json({message: "Помилка оновлення типу!"})
        }
    }


    async destroy(req, res, next) {
        const {id} = req.body
        const type = await Type.findOne({where: {id}})
        if (!type) {
            return next(ApiError.Internal("Неможливо оновити неіснуючий тип!"))
        }
        try {
            await type.destroy()
            return res.json({message: `Тип ${type.name} успішно видалено!`})
        } catch (error) {
            return res.json({message: `Сталася помилка при видаленні типу!`})
        }

    }
}

module.exports = new TypeController()
