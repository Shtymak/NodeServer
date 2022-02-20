const Router = require("express")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')

const basketController = require('../controllers/basketController')

router.get("/", authMiddleware, basketController.getAndCountAll)
router.post("/", authMiddleware, basketController.addToBasket)
router.delete('/', authMiddleware, basketController.deleteFromBasket)
router.post('/order', authMiddleware, basketController.order)

module.exports = router
