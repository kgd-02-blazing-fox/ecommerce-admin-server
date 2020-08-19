"use strict"

const router = require("express").Router()
const ProductControllers = require("../controllers/ProductControllers.js")
const Access = require("../middlewares/access.js")


router.get("/",Access.authenticate,ProductControllers.getProducts)
router.post("/",Access.authenticate,ProductControllers.postProducts)
router.put("/:id",Access.authenticate,Access.andminAuthorize,ProductControllers.putProducts)
router.delete("/:id",Access.authenticate,Access.andminAuthorize,ProductControllers.delProducts)


module.exports = router