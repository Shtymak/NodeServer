const Router = require("express")
const router = new Router()

const brandRouter = require('./brandRouter')
const deviceRouter = require('./deviceRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')
const ratingRouter = require('./ratingRouter')
const orderRouter = require('./orderRouter')
router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/order', orderRouter)
router.use('/basket', basketRouter)
router.use('/rating', ratingRouter)

module.exports = router
