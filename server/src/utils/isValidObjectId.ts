import { Types } from 'mongoose'
import AppError from '../AppError'

const isValidObjectId = (id: any) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid Object ID.', 400)
  }

  return true
}

export default isValidObjectId
