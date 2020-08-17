const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/ProductsController')

router.get('/', ProductController.fetchProduct)
router.post('/', ProductController.addProduct)
// router.delete('/:productId', ProductController.deleteProduct)
// router.get('/:productId', ProductController.getSpesificProduct)
// router.put('/', ProductController.fetchProduct)


module.exports = router