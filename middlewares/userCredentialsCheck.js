const jwt = require('jsonwebtoken')
const { User } = require('../models')

async function authenticate(req, res, next) {
  const payload = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
  if (!payload) {
    next({
      status: 401,
      message: "Unathorized action!"
    })
  } else {
    try {
      const user = await User.findOne({
        where: { email: payload.email }
      })
      if (user) {
        req.userId = user.id
        req.userEmail = user.email
        next()
      } else {
        next({
          status: 401,
          message: "Unathorized action!"
        })
      }
    } catch (err) {
      next({
        status: 401,
        message: "Unathorized action!"
      })
    }
  }
}


function authorize(req, res, next) {
  User.findOne({
    where: {
      email: req.userEmail
    }
  })
    .then(user => {
      next()
    })
    .catch(err => {
      next({
        status: 401,
        message: "Unathorized action!"
      })
    })
}

module.exports = { authenticate, authorize }