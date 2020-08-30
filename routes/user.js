const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { authentication } = require('../middlewares/authentication')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/order', authentication, userController.getAllOrder)
router.patch('/order', authentication, userController.updateOrder)

module.exports = router


// -----
// ## Data
// -----
// * email: citranur@contoh.com
// * password: 123456

// * env template :    PORT=
//                     SECRET=
//                     EMAIL_SEND=
//                     PASSWORD_SEND=

// * Client-Side-Customer Deploy Link:
//     https://e-commerce-cms-customer.web.app/

// * Client-Side-Admin Deploy Link:
//     https://e-commerce-cms-admin-client.web.app/

// * Server-Side Deploy Link /
//     API Endpoint Base URL:
//     https://e-commerce-cms-admin-client.web.app/
