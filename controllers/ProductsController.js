const { Product } = require('../models')
const e = require('express')

class ProductController {
  static async fetchProduct(req, res, next) {
    try {
      const data = await Product.findAll()
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async addProduct(req, res, next) {
    try {
      const data = await Product.create({
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock
      })
      res.status(201).json(data)
    } catch (err) {
      let message = err.message
      next({
        status: 400,
        message
      })
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const data = await Product.destroy({
        where: { id: req.params.productId }
      })
      if (!data) {
        throw err
      } else {
        res.json({
          status: 200,
          message: "Product deleted"
        })
      }
    } catch (err) {
      next({
        status: 404,
        message: "Product not Found"
      })
    }
  }

  static async getSpesificProduct(req, res, next) {
    try {
      const data = await Product.findOne({
        where: { id: req.params.productId }
      })
      if (!data) {
        throw err
      } else {
        res.status(200).json(data)
      }
    } catch (err) {
      next({
        status: 404,
        message: "Product not Found"
      })
    }
  }

  static async updateSpesificProduct(req, res, next) {
    try {
      const data = await Product.update({
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock
      },
      {
        where: { id: req.params.productId },
        returning: true
      })
      res.status(201).json(data[1][0])
    } catch (err) {
      next({
        status: 400,
        message: err.message
      })
    }
  }
}

module.exports = ProductController