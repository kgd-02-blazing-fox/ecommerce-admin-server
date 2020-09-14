const express = require('express');
const app = express()
var cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./midlewares/errorHandler')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/', router)
app.use(errorHandler)
module.exports = app