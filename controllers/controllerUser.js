const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class ControllerUser {
  static async postUsersLogin(req, res, next) {
    console.log('======Hai>' + req.body.email, req.body.password)
    const inputPassword = req.body.password
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      const databasePassword = user ? user.password : ''
      if (!user) {
        throw { name: "Invalid email and password" }
      } else if (!comparePassword(inputPassword, databasePassword)) {
        throw { name: "Invalid email and password" }
      } else {
        const payload = {
          email: user.email
        }
        const token = signToken(payload)
        res.status(200).json({
          token
        })
      }
    } catch (err) {
      console.log(err.name)
      next(err)
    }
  }
  static async postUsersRegister(req, res, next) {
    try {
      console.log(req.body)
      const { email, password } = req.body

      const userExist = await User.findOne({
        where: { email }
      })

      if (userExist) {
        throw { name: 'User Sudah terdaftar' }
      } else {
        console.log('Tidak ada user')
        const registerUser = await User.create({
          email,
          password
        })

        res.status(201).json({
          message: `Succes Register User ${registerUser.email} `
        })
      }

    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }
}

module.exports = ControllerUser