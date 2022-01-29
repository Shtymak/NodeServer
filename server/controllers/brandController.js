const {Brand, Type} = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async update(req, res, next) {
        const {id, object} = req.body
        const brand = this.#candidate(id, next)
        try {
            const updateMask = (object) => {
                return {
                    name: object.name
                }
            }
            await brand.update(updateMask(object))
            await brand.save()
            return res.json(brand)
        } catch (error) {
            return res.json({message: "Помилка оновлення бренду!"})
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

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async #candidate(id, next) {
        const candidate = await Brand.findOne({where: {id}})
        if (!candidate) {
            return next(ApiError.Internal("Неможливо оновити неіснуючий бренд!"))
        }
        return candidate
    }
}

module.exports = new BrandController()
