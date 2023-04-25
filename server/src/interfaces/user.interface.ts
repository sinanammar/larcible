import { Document, Types } from 'mongoose'
import { INft } from './nft.Interface'

export interface IUser extends Document {
  _id: number
  firstname: string
  email: string
  password: string
  role?: string
  followers: Types.ObjectId //Document['_id'][]
  following: Types.ObjectId //Document['_id'][]
  avatar?: string | null
  wallet?: string
  created: Types.DocumentArray<INft> //Document['_id'][]
  ownedNFTs: Types.DocumentArray<INft> //Document['_id'][]
  likes: Document['_id'][]
}

export interface IUserMethods {
  generateAccessToken(): string
  authenticateUser: (firstname: string, password: string) => IUser
}
