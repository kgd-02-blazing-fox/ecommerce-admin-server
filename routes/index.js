const express = require('express')
const router = express.Router()

const products = require('./products')
const admin = require('./admin')

router.use('/products', products)
router.use('/admin', admin)

module.exports = router