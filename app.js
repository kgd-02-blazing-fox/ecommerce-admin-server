"use strict"

const express = require("express")
const port = 3000
const app = express()
const cors = require("cors")
const {errorHandling} = require("./middlewares/errorhandling.js")

const index = require("./router")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


app.use("/",index)
app.use(errorHandling)

// app.listen(port, ()=>{console.log(`E-commerce running at port:${port}`)})

module.exports = app