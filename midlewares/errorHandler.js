const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'SequelizeValidationError':
      const errors = err.errors.map(error => ({
        message: error.message
      }));
      res.status(400).json({
        errors
      })
      break;
    case 'Not Authentication':
      res.status(401).json({
        error: 'You dont have token'
      })

      break;
    case 'Not Authorized':
      res.status(401).json({
        error: 'You dont have previllege'
      })

      break;
    case 'JsonWebTokenError':
      res.status(401).json({
        error: 'Your token is wrong'
      })

      break;
    case 'Invalid email and password':
      res.status(400).json({
        message: 'Invalid email and password'
      })
      break;
    case 'Not Found':
      res.status(404).json({
        message: 'Cant update/delete, because Product not found'
      })

      break;
    default:
      res.status(500).json({
        errors: [{ message: 'internal server error' }]
      })
  }
}
module.exports = errorHandler


