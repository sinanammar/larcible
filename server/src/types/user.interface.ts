import { Document } from 'mongoose'

export interface UserInterface extends Document {
  _id: number
  firstname: string
  email: string
  password: string
  role?: string
  followers: Document['_id'][]
  following: Document['_id'][]
  avatar?: Buffer | null
  wallet?: string
  balance?: number
  created: Document['_id'][]
  onSale: Document['_id'][]
  likes: Document['_id'][]
  // generateAccessToken: () => string
  // authenticateUser: (firstname: string, password: string) => UserInterface
}

export interface IUserMethods {
  generateAccessToken(): string
  authenticateUser: (firstname: string, password: string) => UserInterface
}

export interface IEditPrfile {
  firstname: string
  email: string
}
