const { Product } = require('../models')

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
      next({
        status: 400,
        message: err.message
      })
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const data = await Product.destroy({
        where: { id: req.productId }
      })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

}

module.exports = ProductController