import AppError from '../AppError'
import { Request, Response, NextFunction } from 'express'

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
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

export default errorHandler
