const Router = require("express")
const router = new Router()
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')
const admin = "ADMIN"
router.put('/', checkRole(admin), brandController.update)
router.post("/", checkRole(admin), brandController.create)
router.delete('/', checkRole(admin), brandController.destroy)
router.get("/", brandController.getAll)

module.exports = router
