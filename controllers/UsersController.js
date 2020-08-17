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
          let payload = { email: data.email, role: data.role }
          const access_token = userToken(payload)
          res.status(200).json({
            access_token
          })
        } else {
          next(next({
            status: 400,
            message: "email / password invalid!"
          }))
        }
      } else {
        next(next({
          status: 400,
          message: "email / password invalid!"
        }))
      }
    } catch (err) {
      next(next({
        status: 500
      }))
    }
  }
}

module.exports = UserController