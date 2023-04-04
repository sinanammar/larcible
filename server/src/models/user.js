const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
require('dotenv').config()

const jwt = require('jsonwebtoken')
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
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  const user = this
  console.log(user.isModified('password'))
  console.log('Pass middleware')
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.methods.generateAccessToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
  const bearerToken = 'Bearer ' + token
  return bearerToken
}

userSchema.statics.authenticateUser = async function ({ firstname, password }) {
  const user = await User.findOne({ firstname })
  if (!user) throw new Error('Unable to log in, wrong credintials!')

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Unable to login, wrong credintials!')

  return user
}

const User = mongoose.model('User', userSchema)
module.exports = User
