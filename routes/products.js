const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/ProductsController')
const { authenticate, authorize } = require('../middlewares/credentials')

router.get('/', ProductController.fetchProduct)

//admin route
router.post('/', authenticate, authorize, ProductController.addProduct)
router.delete('/:productId', authenticate, authorize, ProductController.deleteProduct)
router.get('/:productId', authenticate, authorize, ProductController.getSpesificProduct)
router.put('/:productId', authenticate, authorize, ProductController.updateSpesificProduct)

// this is from and for user
router.post('/stock', ProductController.SpesificProductStockChange)
router.get('/user/:productId', ProductController.getSpesificProduct)

module.exports = router