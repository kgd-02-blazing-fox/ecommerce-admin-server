const express = require('express')
const router = express.Router()

const products = require('./products')
const users = require('./user')

router.use('/products', products)
router.use('/users', users)

module.exports = router