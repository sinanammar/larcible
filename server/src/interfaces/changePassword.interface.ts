import { Types } from 'mongoose'

export interface ChangePasswordInterface {
  userId: Types.ObjectId
  savedPassword: string
  currentPassword: string
  newPassword: string
}
