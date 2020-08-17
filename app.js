const express = require('express');
const app = express()
const cors = require('cors')

const index = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/', index)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

module.exports = app