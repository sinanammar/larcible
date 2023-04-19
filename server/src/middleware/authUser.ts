import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
const AppError = require('../AppError').default
import User from '../models/user'
require('dotenv').config()

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.header('Authorization')) {
      throw new AppError('Not Authorized', 401)
    } else {
      const token = req.header('Authorization')!.replace('Bearer ', '')
      const validtoken: any = jwt.verify(token, 'mysecret')

      const user = await User.findOne({
        _id: validtoken._id,
      })

      if (!user) throw new AppError('Invalid operation. User not found.', 401)

      req.user = user
      req.token = token
      next()
    }
  } catch (error) {
    next(error)
  }
}

function authRole(role: String) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role !== role) {
      return res.status(401).send('Not allowed')
    }
    return next()
  }
}

export default authUser
