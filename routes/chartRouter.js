const express = require('express')
const router = express.Router()

const ControllerChart = require('../controllers/controllerChart')
const { authentication } = require('../midlewares/auth')

router.post('/add', authentication, ControllerChart.postAddChart)
router.get('/show', authentication, ControllerChart.showChart)
router.delete('/delete', authentication, ControllerChart.deleteChart)

module.exports = router