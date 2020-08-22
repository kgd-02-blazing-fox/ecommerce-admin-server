const express = require('express')
const router = express.Router()

const products = require('./products')
const admin = require('./admin')
const user = require('./user')

router.use('/products', products)
router.use('/admin', admin)
router.use('/user', user)

module.exports = router