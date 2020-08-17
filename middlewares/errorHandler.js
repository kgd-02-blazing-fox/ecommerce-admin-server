function errorHandler(err, req, res, next) {
  console.log(err, '<<< ERROR HANDLER RESPONSE');

  let statusCode, message
  if (err.status === 400) {
    statusCode = 400
    message = err.message
  } else {
    statusCode = 500
    message = err.message
  }

  res.status(statusCode).json({
    message
  })
}

module.exports = errorHandler