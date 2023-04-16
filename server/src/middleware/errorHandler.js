/* eslint-disable no-unused-vars */
const AppError = require('../AppError')

const errorHandler = (error, req, res, next) => {
  if (error.message.includes('ValidationError')) {
    return res.status(400).send({
      type: 'Validation Error!',
      details: error.message,
    })
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      errorMessage: error.message,
    })
  }

  // send "something went wrong" eventually
  // I am sending my uncaught errors to the client here
  console.log(error)
  return res.status(500).send(error.message)
}

module.exports = errorHandler
