import { Model, Schema, model, HydratedDocument } from 'mongoose'

import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
require('dotenv').config()

import { UserInterface, IUserMethods } from '../types/user.interface'

interface UserModel extends Model<UserInterface, {}, IUserMethods> {
  authenticateUser(
    firstname: string,
    password: string,
  ): Promise<HydratedDocument<UserInterface, IUserMethods>>
}

const WALLET_ENUM = ['Metamask', 'Bitski', 'Alpha', 'Enjin', 'Wallet Connect', 'CoinBase']

const userSchema = new Schema<UserInterface, UserModel, IUserMethods>(
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
      type: Buffer,
      default: null,
    },
    wallet: {
      type: String,
      enum: WALLET_ENUM,
      message: 'Invalid wallet type.',
    },
    balance: {
      type: Number,
    },
    created: [
      {
        type: Schema.Types.ObjectId,
        ref: 'NFT',
      },
    ],
    onSale: [
      {
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

userSchema.methods.generateAccessToken = function () {
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

// userSchema.statics.authenticateUser = async function ({ firstname, password }) {
//   // eslint-disable-next-line no-use-before-define
//   const user = await User.findOne({ firstname })
//   if (!user) throw new Error('Unable to log in, wrong credintials!')

//   const isMatch = await bcrypt.compare(password, user.password)
//   if (!isMatch) throw new Error('Unable to login, wrong credintials!')

//   return user
// }

const User = model<UserInterface, UserModel>('User', userSchema)
export default User
