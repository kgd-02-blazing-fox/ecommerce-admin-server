const jwt = require('jsonwebtoken')
const { Admin } = require('../models')

function authenticate(req, res, next) {
  const payload = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)

  if (!payload) {
    next({
      status: 401,
      message: "Unathorized action!"
    })
  } else {
    Admin.findOne({
      where: { email: payload.email }
    })
      .then(admin => {
        if (admin) {
          req.adminEmail = admin.email
          next()
        } else {
          next({
            status: 401,
            message: "Unathorized action!"
          })
        }
      })
      .catch(err => {
        next({
          status: 401,
          message: "Unathorized action!"
        })
      })
  }
}


function authorize(req, res, next) {
  Admin.findOne({
    where: {
      email: req.adminEmail
    }
  })
    .then(admin => {
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