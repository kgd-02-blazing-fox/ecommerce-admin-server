const { User } = require('../models')
const { comparePassword } = require('../helpers/hashPassword')
const userToken = require('../helpers/jwt')

class UserController {
  static async login(req, res, next) {
    try {
      const data = await User.findOne({
        where: { email: req.body.email }
      })
      if (data) {
        const valid = comparePassword(req.body.password, data.password)
        if (valid) {
          let payload = { email: data.email }
          const access_token = userToken(payload)
          res.status(200).json({
            access_token,
            email: data.email
          })
        } else {
          throw err
        }
      } else {
        throw err
      }
    } catch (err) {
      next({
        status: 400,
        message: "email / password invalid!"
      })
    }
  }

  static async register(req, res, next) {
    try {
      const user = await User.create({
        email: req.body.email,
        password: req.body.password,
      })
      res.status(201).json({
        email: user.email,
      })
    } catch (err) {
      next({
        status: 500,
        message: "registration failed, check input"
      })
    }
  }
}

module.exports = UserController