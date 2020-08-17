const jwt = require('jsonwebtoken')

function userToken(payload) {
  const token = jwt.sign(payload, 'rahasia')
  return token
}

module.exports = userToken