const {Device, DeviceInfo, Rating} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const fileType = '.jpg'
const path = require('path')
const {log} = require("nodemon/lib/utils");

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {id} = req.user
            const {img} = req.files
            let fileName = uuid.v4() + fileType
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName, userId: id})

            if (info) {
                info = JSON.parse(info)
                info.forEach(params =>
                    DeviceInfo.create({
                        title: params.title,
                        description: params.description,
                        deviceId: device.id
                    }))
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 30
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
        })
        const {count, rows} = await Rating.findAndCountAll({where: {deviceId: id}})
        const rating = Math.ceil(rows.reduce((total, row) => {
            return total + row.rate
        }, 0) / count || 0)
        if (rating !== device.rating)
            await device.update({rating: rating})
        return res.json(device)
    }

    async update(req, res, next) {
        const {id, userId, object} = req.body
        const updaterId = req.user.id
        if (updaterId !== userId)
            return next(ApiError.Forbidden("Неможливо змінити чужий предмет!"))
        const candidate = await Device.findOne({where: {id}})
        if (!candidate)
            return next(ApiError.Internal("Неможливо оновити неіснуючий предмет!"))
        try {
            const updateMask = (object) => {
                return {
                    name: object.name,
                    price: object.price,
                    typeId: object.typeId,
                    brandId: object.brandId
                }
            }
            await candidate.update(updateMask(object))
            await candidate.save()
            return res.json(candidate)
        } catch (error) {
            return res.json({message: ApiError.Internal(`Сталася помилка при оновленні ${candidate.id}`)})
        }
    }

    async destroy(req, res, next) {
        const {id, userId} = req.body
        const deleterId = req.user.id
        if (deleterId !== userId)
            return next(ApiError.Forbidden("Неможливо видалити чужий предмет!"))
        const candidate = await Device.findOne({where: {id}})
        if (!candidate)
            return next(ApiError.Internal("Неможливо видалити неіснуючий предмет!"))
        try {
            await candidate.destroy()
            return res.json({message: `Предмет ${id} успішно видалено!`})
        } catch (error) {
            return res.json({message: `Сталася помилка при видаленні предмету`})
        }
    }
}

module.exports = new DeviceController()
