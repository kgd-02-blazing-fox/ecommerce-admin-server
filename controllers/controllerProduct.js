const { Product } = require('../models/index');

class ControllerProduct {

  static async getProducts(req, res, next) {
    try {
      const product = await Product.findAll()
      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  }
  static async getProduct(req, res, next) {
    try {
      const product = await Product.findByPk(req.params.id)
      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  }
  static async postProducts(req, res, next) {
    const { name, image_url, price, stock } = req.body
    console.log(req.body)

    try {
      const newProduct = await Product.create({ name, image_url, price, stock })

      res.status(201).json(newProduct)
    } catch (err) {
      next(err)
    }
  }
  static async deleteProducts(req, res, next) {
    console.log(req.params.id)
    try {
      const product = await Product.findByPk(req.params.id)
      if (!product) {
        throw { name: 'Not Found' }
      } else {
        await Product.destroy({
          where: {
            id: req.params.id
          }
        })
        res.status(200).json({
          message: "Deleted"
        })
      }

    } catch (err) {
      next(err)
    }
  }
  static async patchProducts(req, res, next) {
    try {
      const product = await Product.findByPk(req.params.id)
      if (!product) {
        throw { name: 'Not Found' }
      } else {
        const updateProduct = await Product.update({ name: req.body.name, image_url: req.body.image_url, price: req.body.price, stock: req.body.stock }, {
          where: {
            id: req.params.id
          }
        })
        res.status(200).json({
          message: 'Update Success'
        })
      }
    } catch (err) {
      next(err)
    }
  }

}

module.exports = ControllerProduct
