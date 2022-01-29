const {Type, Brand} = require('../models/models')
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
        const type = this.#candidate(id, next)
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
        const brand = this.#candidate(id, next)
        try {
            await brand.destroy()
            return res.json({message: `Бернд ${brand.name} успішно видалено!`})
        } catch (error) {
            return res.json({message: `Сталася помилка при видаленні бренду!`})
        }

    }

    async #candidate(id, next) {
        const candidate = await Type.findOne({where: {id}})
        if (!candidate) {
            return next(ApiError.Internal("Неможливо оновити неіснуючий бренд!"))
        }
        return candidate
    }
}

module.exports = new TypeController()
