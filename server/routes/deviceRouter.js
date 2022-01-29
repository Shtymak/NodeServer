const authMiddleware = require('../middleware/authMiddleware')
const Router = require("express")
const router = new Router()
const deviseController = require('../controllers/deviceController')

router.post("/", authMiddleware, deviseController.create)
router.get("/", deviseController.getAll)
router.get("/:id", deviseController.getOne)
router.put("/", authMiddleware, deviseController.update)
router.delete("/", authMiddleware, deviseController.destroy)

module.exports = router
