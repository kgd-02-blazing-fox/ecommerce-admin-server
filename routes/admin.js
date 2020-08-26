const express = require('express')
const router = express.Router()

const AdminController = require('../controllers/AdminController')

router.post('/', AdminController.login)


module.exports = router