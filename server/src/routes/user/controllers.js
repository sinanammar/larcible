const AppError = require('../../AppError')
// Services
const userService = require('../../services/userService')

// Schema validation
const { validateSignup } = require('../../schema/registerUserSchema')
const { validateLogin } = require('../../schema/loginUserSchema')
const { validateEdit } = require('../../schema/editProfileSchema')
const { validateChangePassword } = require('../../schema/changePasswordSchema')

const { tryCatch } = require('../../utils/tryCatch')
const isValidObjectId = require('../../utils/isValidObjectId')

module.exports.registerUser = tryCatch(async (req, res) => {
  const { error } = validateSignup(req.body)

  if (error) {
    throw new Error(error)
  }

  const response = await userService.registerUser(req.body)
  return res
    .status(200)
    .cookie('jwt', response.token, { maxAge: 9000000 })
    .send(response.user)
})

module.exports.loginUser = tryCatch(async (req, res) => {
  const { error } = validateLogin(req.body)

  if (error) {
    throw new Error(error)
  }

  const response = await userService.loginUser(req.body)
  return res
    .status(200)
    .cookie('jwt', response.token, { maxAge: 9000000 })
    .send(response.user)
})

module.exports.logoutUser = tryCatch(async (req, res) =>
  res.clearCookie('jwt').send('Logged out successfully!'),
)

module.exports.fetchUserProfile = tryCatch(async (req, res) => {
  const userId = req.params.id
  isValidObjectId(userId)

  const response = await userService.fetchUserProfile(userId)

  return res.status(200).send(response)
})

module.exports.followUser = tryCatch(async (req, res) => {
  const followerId = req.user._id
  const followedId = req.params.id
  isValidObjectId(followedId)
  const resposne = await userService.followUser(followerId, followedId)

  res.status(200).send(resposne)
})

module.exports.unFollowUser = tryCatch(async (req, res) => {
  const followerId = req.user._id
  const followedId = req.params.id
  isValidObjectId(followedId)
  const resposne = await userService.unFollowUser(followerId, followedId)

  return res.status(200).send(resposne)
})

module.exports.fetchFollowing = tryCatch(async (req, res) => {
  const userId = req.params.id
  isValidObjectId(userId)
  const response = await userService.fetchFollowing(userId)

  return res.status(200).send(response)
})

module.exports.fetchFollowers = tryCatch(async (req, res) => {
  const userId = req.params.id
  isValidObjectId(userId)
  const response = await userService.fetchFollowers(userId)

  return res.status(200).send(response)
})

module.exports.editUserProfile = tryCatch(async (req, res) => {
  const userId = req.user._id

  if (Object.keys(req.body).length === 0) {
    throw new AppError('Request body cannot be empty', 400)
  }

  const { error } = validateEdit(req.body)

  if (error) {
    throw new Error(error)
  }
  const response = await userService.editUserProfile(userId, req.body)

  return res.status(200).send(response)
})

module.exports.changeUserPassword = tryCatch(async (req, res) => {
  const { error } = validateChangePassword(req.body)
  if (error) {
    throw new Error(error)
  }

  const userData = {
    userId: req.user._id,
    savedPassword: req.user.password,
    currentPassword: req.body.currentPassword,
    newPassword: req.body.newPassword,
  }

  const response = await userService.changeUserPassword(userData)

  return res.status(200).send(response)
})

module.exports.uploadUserAvatar = tryCatch(async (req, res) => {
  const response = await userService.uploadUserAvatar(req.user, req.file.buffer)
  return res.status(200).send(response)
})

module.exports.getUserAvatar = tryCatch(async (req, res) => {
  const response = await userService.getUserAvatar(req.user)
  return res.status(200).send(response)
})

module.exports.deleteUserAvatar = tryCatch(async (req, res) => {
  const response = await userService.deleteUserAvatar(req.user)
  return res.status(200).send(response)
})

module.exports.deleteAccount = tryCatch(async (req, res) => {
  const response = await userService.deleteAccount(req.user._id)
  return res.status(200).send(response)
})

module.exports.getCreatedNFTs = tryCatch(async (req, res) => {
  const userId = req.params.userId.trim()
  isValidObjectId(userId)

  const response = await userService.getCreatedNFTs(userId)
  return res.status(200).send(response)
})

module.exports.likeNFT = tryCatch(async (req, res) => {
  const { nftId } = req.params
  isValidObjectId(nftId)

  const response = await userService.likeNFT(req.user._id, nftId, req.user)

  return res.status(200).send(response)
})

// module.exports.name = tryCatch(async (req, res) => {})
