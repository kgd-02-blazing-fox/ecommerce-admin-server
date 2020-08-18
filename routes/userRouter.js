const express = require('express')
const router = express.Router()

const ControllerUser = require('../controllers/controllerUser')

router.post('/login', ControllerUser.postUsersLogin)

module.exports = router