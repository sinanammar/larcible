const AppError = require('../AppError')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authUser = async (req, res, next) => {
  try {
    if (!req.header('Authorization')) {
      throw new AppError('Not Authorized', 401)
    } else {
      const token = req.header('Authorization').replace('Bearer ', '')
      const validtoken = jwt.verify(token, process.env.JWT_SECRET)

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

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(401).send('Not allowed')
    }
    next()
  }
}

module.exports = { authUser, authRole }
