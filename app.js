"use strict"

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
const {errorHandling} = require("./middlewares/errorhandling.js")

const index = require("./router")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


app.use("/",index)
app.use(errorHandling)

module.exports = app