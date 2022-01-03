const Router = require("express")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')

const ratingController = require('../controllers/ratingController')

router.get('/', authMiddleware,)
router.post('/', authMiddleware,)
