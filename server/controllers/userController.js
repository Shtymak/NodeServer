const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User, Basket, Device, Order} = require('../models/models')
const jwt = require('jsonwebtoken')
const UserDto = require("../UserDto/UserDto");

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.BadRequest("От халепа! Неправильний пароль або логін"))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.BadRequest("Дідько! Схоже, що ми знайшли вашого клона"))
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({email, role, password: hashPassword})
        await Basket.create({userId: user.id})
        await Order.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.Internal("От морока! Не можемо знайти ваше досьє. Схоже, що його поцупило СБУ"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.Internal("Ой-ой! Схоже, що пароль хибний"))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getDevices(req, res, next) {
        const {id} = req.user
        const devices = await Device.findAndCountAll({
            where: {
                userId: id
            }
        })
        return res.json(devices)
    }

    async getAllUsers(req, res, next) {
        const {rows, count} = await User.findAndCountAll({where: {role: "USER"}})
        const users = [...rows.map(user => new UserDto(user))]
        res.json({users, count})
    }

    async destroy(req, res, next) {
        const {id} = req.body
        const userData = await User.destroy({where: {id}})
        if (!userData) {
            return next(ApiError.BadRequest("Невдалося видалити користувача!"))
        }
        res.json(userData)
    }
}

module.exports = new UserController()
