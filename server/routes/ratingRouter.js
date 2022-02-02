const Router = require("express")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const ratingController = require('../controllers/ratingController')

router.get('/:id', ratingController.getOne)
router.post('/', authMiddleware, ratingController.create)

module.exports = router
