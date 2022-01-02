const express = require("express")
require('dotenv').config()
const sequelize = require('./db')
const PORT = process.env.PORT || 5000
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate() //вхід у БД
        await sequelize.sync()         //синхронізація даних
        app.listen(PORT, () => console.log(`Сервер стартував на порті ${PORT}`))
    } catch (e) {
        console.log(e.message)
    }
}
//TODO Add Basket Controller and Rating.
start()


