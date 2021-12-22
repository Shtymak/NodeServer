const Router = require("express")
const router = new Router()
const deviseController = require('../controllers/deviceController')

router.post("/", deviseController.create)
router.get("/", deviseController.getAll)
router.get("/:id", deviseController.getOne)

module.exports = router
