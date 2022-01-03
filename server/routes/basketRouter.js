const Router = require("express")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')

const basketController = require('../controllers/basketController')


router.get("/", authMiddleware, basketController.getOne)
router.post("/", authMiddleware, basketController.addToBasket)
router.delete('/', authMiddleware, basketController.deleteFromBasket)

module.exports = router
