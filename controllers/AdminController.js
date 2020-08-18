const { Admin } = require('../models')
const { comparePassword } = require('../helpers/hashPassword')
const userToken = require('../helpers/jwt')

class AdminController {
  static async login(req, res, next) {
    try {
      const data = await Admin.findOne({
        where: { email: req.body.email }
      })
      if (data) {
        const valid = comparePassword(req.body.password, data.password)
        if (valid) {
          let payload = { email: data.email}
          const access_token = userToken(payload)
          res.status(200).json({
            access_token
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
}

module.exports = AdminController