if(process.env.NODE_ENV === 'development'){
  require('dotenv').config()
} else if (process.env.NODE_ENV === 'test'){
  require('dotenv').config()
}

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

module.exports = app