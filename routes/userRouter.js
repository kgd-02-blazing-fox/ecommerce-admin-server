const express = require('express')
const router = express.Router()

const ControllerUser = require('../controllers/controllerUser')

router.post('/login', ControllerUser.postUsersLogin)
router.post('/register', ControllerUser.postUsersRegister)

module.exports = router