import { Document, Types } from 'mongoose'
import { INft } from './nft.Interface'

export interface IUser extends Document {
  _id: Types.ObjectId
  firstname: string
  email: string
  password: string
  role?: string
  followers: Types.ObjectId
  following: Types.ObjectId
  avatar?: string | null
  wallet?: string
  created: Types.DocumentArray<INft>
  ownedNFTs: Types.DocumentArray<INft>
  likes: Document['_id'][]
}

export interface IUserMethods {
  generateAccessToken(): string
  authenticateUser: (firstname: string, password: string) => IUser
}
