const Router = require("express")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const orderController = require('../controllers/orderController')

router.get('/', authMiddleware, orderController.getAll)
router.post('/', authMiddleware, orderController.create)
router.delete('/', authMiddleware, orderController.destroy)

module.exports = router
