const authMiddleware = require('../middleware/authMiddleware')
const Router = require("express")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const orderController = require('../controllers/orderController')

router.get('/', authMiddleware, orderController.getAll)

module.exports = router
