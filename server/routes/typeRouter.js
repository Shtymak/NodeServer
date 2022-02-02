const Router = require("express")
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const typeController = require('../controllers/typeController')
const admin = "ADMIN"

router.post("/", checkRole(admin), typeController.create)
router.put("/", checkRole(admin), typeController.update)
router.delete("/", checkRole(admin), typeController.destroy)
router.get("/", typeController.getAll)

module.exports = router
