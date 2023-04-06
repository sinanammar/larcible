const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const WALLET_ENUM = [
  'Metamask',
  'Bitski',
  'Alpha',
  'Enjin',
  'Wallet Connect',
  'CoinBase',
]

const userSchema = new mongoose.Schema(
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
      validate(value) {
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)
module.exports = User

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.methods.generateAccessToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id }, 'mysecret', {
    expiresIn: '1d',
  })
  const bearerToken = `Bearer ${  token}`
  return bearerToken
}

userSchema.statics.authenticateUser = async function ({ firstname, password }) {
  const user = await User.findOne({ firstname })
  if (!user) throw new Error('Unable to log in, wrong credintials!')

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Unable to login, wrong credintials!')

  return user
}

