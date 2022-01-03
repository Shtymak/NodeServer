const Router = require("express")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')

const ratingController = require('../controllers/ratingController')

router.get('/', authMiddleware, ratingController.getOne)
router.put('/', authMiddleware, ratingController.create)

module.exports = router
