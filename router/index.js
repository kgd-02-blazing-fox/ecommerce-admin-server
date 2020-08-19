"use strict"

const router = require("express").Router()
const products = require("./products.js")
const UserControllers = require("../controllers/UserControllers.js")



router.post("/login",UserControllers.login)
router.use("/products",products)

module.exports = router