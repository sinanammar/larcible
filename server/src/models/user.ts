import mongoose, { Model, Schema, model, Types, HydratedDocument } from 'mongoose'

import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
require('dotenv').config()

import { IUser, IUserMethods } from '../interfaces/user.interface'

interface UserModel extends Model<IUser, {}, IUserMethods> {
  authenticateUser(
    firstname: string,
    password: string,
  ): Promise<HydratedDocument<IUser, IUserMethods>>
}

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    firstname: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is Invalid')
        }
      },
    },
    role: {
      type: String,
      default: 'basic',
      enum: ['basic', 'admin'],
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    avatar: {
      type: String,
      default: null,
    },
    wallet: {
      type: Schema.Types.ObjectId,
      ref: 'Wallet',
    },
    created: [
      {
        type: Schema.Types.ObjectId,
        ref: 'NFT',
      },
    ],
    ownedNFTs: [
      {
        // equivalent to 'My Orders' in the design
        type: Schema.Types.ObjectId,
        ref: 'NFT',
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'NFT',
      },
    ],
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.methods.generateAccessToken = function (): string {
  const user = this
  const token = jwt.sign({ _id: user._id }, 'mysecret')
  const bearerToken = `Bearer ${token}`
  return bearerToken
}

userSchema.static(
  'authenticateUser',
  async function authenticateUser(firstname: string, password: string) {
    // eslint-disable-next-line no-use-before-define
    const user = await User.findOne({ firstname })
    if (!user) throw new Error('Unable to log in, wrong credintials!')

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Unable to login, wrong credintials!')

    return user
  },
)

const User = model<IUser, UserModel>('User', userSchema)

export default User
