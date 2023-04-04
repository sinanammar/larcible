const mongoose = require('mongoose')
const AppError = require('../AppError')

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid user ID.', 400)
  }

  return true
}

module.exports = isValidObjectId
