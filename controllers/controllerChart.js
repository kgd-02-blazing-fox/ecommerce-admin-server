const { Chart, Product } = require('../models/index')

class ControllerChart {
  static async postAddChart(req, res, next) {
    const newCart = {
      quantity: Number(req.body.quantity),
      ProductId: Number(req.body.ProductId),
      UserId: req.userLogin.id
    }

    // console.log(typeof Number(req.body.quantity))
    // console.log(typeof req.body.ProductId)
    // console.log(typeof req.userLogin.id)
    console.log(typeof newCart.quantity)
    console.log(typeof newCart.ProductId)
    console.log(typeof newCart.UserId)
    console.log(newCart)


    try {
      const exist = await Chart.findOne({
        where: {
          ProductId: newCart.ProductId,
          UserId: newCart.UserId
        },
        include: Product
      })
      // console.log('---->Checkpoint1')
      // console.log(exist)

      if (exist) {
        console.log(exist)
        const newQuantity = exist.quantity + newCart.quantity
        // console.log('---->Checkpoint2')
        // console.log(newQuantity)
        if (newQuantity > exist.Product.stock) {
          // console.log(exist.Product.stock)
          // console.log('---->Checkpoint3')
          throw { name: 'Stock kurang' }
        } else {
          const cart = await Chart.update({ quantity: newQuantity }, {
            where: {
              ProductId: newCart.ProductId
            }
          })
          res.status(200).json({
            message: 'Berhasil ditambahkan'
          })
        }

      } else {
        // console.log("Checkpoin 4")

        try {
          const chart = await Chart.create(newCart)
          res.status(201).json(chart)
        } catch (err) {
          console.log(err)
        }
      }


    } catch (err) {
      console.log(err.name)
      res.status(500).json({
        eror: err.name
      })
    }
  }
  static async showChart(req, res, next) {
    const UserId = req.userLogin.id
    try {
      const charts = await Chart.findAll({
        where: {
          UserId
        },
        include: [{ model: Product }],
        order: [[Product, 'name', 'ASC']] 
      })
      res.status(200).json({
        charts
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
  static async deleteChart(req, res, next) {
    try {
      // console.log('1 masih')
      const chart = await Chart.destroy({
        where: {
          UserId: req.userLogin.id,
          ProductId: req.body.ProductId
        }
      })
      if (chart) {
        res.status(200).json({
          message: "Succes delete"
        })
      } else {
        throw ({ name: "chart not found" })
      }
    } catch (err) {
      next(err)
      console.log(err)
    }
  }
  static async minStock(req, res, next) {
    try {
      const newCart = {
        ProductId: Number(req.body.ProductId),
        UserId: req.userLogin.id
      }

      const exist = await Chart.findOne({
        where: {
          ProductId: newCart.ProductId,
          UserId: newCart.UserId
        },
        include: Product
      })
      // console.log('---->Checkpoint1')
      // console.log(exist)

      if (exist) {
        if (exist.quantity > 1) {
          const newQuantity = exist.quantity - 1
          const cart = await Chart.update({ quantity: newQuantity }, {
            where: {
              ProductId: newCart.ProductId
            }
          })
          res.status(200).json({
            message: 'Berhasil dikurangi'
          })
        } else {
          throw { name: 'Kuantity gaboleh kurang dari 1' }
        }
      } else {
        throw { name: 'Not Found' }
      }
    } catch (err) {
      next(err)
    }
  }
}
module.exports = ControllerChart