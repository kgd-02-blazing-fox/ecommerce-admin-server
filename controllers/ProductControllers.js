"use strict"

const {User,Product} = require("../models/index.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

class ProductControllers {
    static async getProducts(req,res,next) {
        try {
            let products = await Product.findAll({})
            res.status(200).json(products)
        } catch (error) {
            next(error)
        }

    }
    static async postProducts(req,res,next) {
        try {
            let {name,image_url,price,stock,category} = req.body
            let result = await Product.create({
                name,
                image_url,
                price,
                stock,
                category
            })
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
    static async putProducts(req,res,next) {
        try {
            let {name,image_url,price,stock,category} = req.body
            let result = await Product.update({
                name,
                image_url,
                price,
                stock,
                category
            },{where:{id:req.params.id},returning:true})
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    static async delProducts(req,res,next) {
        try {
            let result = await Product.findByPk(req.params.id)
            let destroyed = await Product.destroy({where:{id:req.params.id}})
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductControllers