const express = require('express')
const router = express.Router()

const { authenticate, authorize } = require('../middlewares/userCredentialsCheck')

const UserController = require('../controllers/UserController')
const CartController = require('../controllers/CartController')

// "/user"
router.post('/login', UserController.login)
router.post('/register', UserController.register)

// get all item in user's carts
router.get('/cart', authenticate, authorize, CartController.getCart)

// creating new input to the cart
router.post('/cart', authenticate, authorize, CartController.createCart )

//updating the ammount of items in the cart
router.put('/cart/:cartId/increment', authenticate, authorize, CartController.addItemAmmount)
router.put('/cart/:cartId/decrement', authenticate, authorize, CartController.reduceItemAmmount)

//delete item from cart
router.delete('/cart/:itemId', authenticate, authorize, CartController.destroyItem)

//checkout
router.delete('/checkout', authenticate, authorize, CartController.destroyCart)

module.exports = router