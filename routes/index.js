const express = require('express')
const router = express.Router()

const userRouter = require('./userRouter')
const productRouter = require('./productRouter')

router.get('/', (req, res) => {
  res.send('Welcome To Ecommerce API, Created By Ichlasul Amal.')
})
router.use('/users', userRouter)
router.use('/products', productRouter)


module.exports = router