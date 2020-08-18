const { User } = require('../models/index')
const { verifyToken } = require('../helpers/jwt')

async function authentication(req, res, next) {
  const token = req.headers.token
  try {
    if (!token) {
      throw { name: 'Not Authentication' }
    } else {
      const payload = verifyToken(token)
      console.log(payload)
      const user = await User.findOne({
        where: {
          email: payload.email
        }
      })
      if (!user) {
        throw { name: 'Email not valid' }
      } else {
        req.userLogin = user
        next()
      }
    }
  } catch (err) {
    next({
      name: err.name
    })
  }
}
async function isAdmin(req, res, next) {

  const userRole = req.userLogin.role
  console.log(userRole)
  try {
    if (userRole !== 'admin') {
      throw { name: 'Not Authorized' }
    } else {
      next()
    }
  } catch (err) {
    next({
      name: err.name
    })
  }


}

module.exports = {
  authentication,
  isAdmin
}
