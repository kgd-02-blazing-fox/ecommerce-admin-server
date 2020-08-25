const { User, Product, Cart } = require('../models')

class CartController {
  static async getCart(req, res, next) {
    try {
      const data = await Cart.findAll({
        where: { UserId: req.userId },
        include:
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'image_url']
        },
      })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async createCart(req, res, next) {
    try {
      const items = await Cart.create({
        UserId: req.userId,
        ProductId: req.body.ProductId,
        ammount: req.body.ammount
      })
      res.status(201).json(items)
    } catch (err) {
      next(err)
    }
  }

  static async addItemAmmount(req, res, next) {
    try {
      const addedItem = await Cart.increment(
        { ammount: +1 },
        {
          where: { id: req.params.cartId }
        })
      res.status(200).json(addedItem)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async reduceItemAmmount(req, res, next) {
    try {
      const addedItem = await Cart.decrement(
        { ammount: 1 },
        {
          where: { id: req.params.cartId }
        })
      res.status(200).json(addedItem)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async destroyItem(req, res, next){
    try {
      const data = await Cart.destroy({
        where: { id: req.params.itemId }
      })
      if (!data) {
        throw err
      } else {
        res.json({
          status: 200,
          message: "Item deleted from cart"
        })
      }
    } catch (err) {
      next({
        status: 404,
        message: "Product not Found"
      })
    }
  }

  static async destroyCart(req, res, next){
    try {
      const data = await Cart.destroy({
        where: { UserId: req.userId }
      })
      if (!data) {
        throw err
      } else {
        res.json({
          status: 200,
          message: "Cart deleted"
        })
      }
    } catch (err) {
      next({
        status: 404,
        message: "Product not Found"
      })
    }
  }
}

module.exports = CartController