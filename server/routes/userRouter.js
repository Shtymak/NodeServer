const Router = require("express")
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
router.post("/registration", userController.registration)
router.post("/login", userController.login)
router.get("/auth", authMiddleware, userController.check)
router.get('/own', authMiddleware, userController.getDevices)
router.get('/users', checkRoleMiddleware("ADMIN"), userController.getAllUsers)
router.delete('/delete', checkRoleMiddleware("ADMIN"), userController.destroy)


module.exports = router
