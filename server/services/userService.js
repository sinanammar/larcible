const User = require('../models/user')
const AppError = require('../AppError')
const bcrypt = require('bcrypt')

module.exports.registerUser = async (userData) => {
  const user = User(userData)
  const token = await user.generateAccessToken()
  await user.save()

  if (!user) throw new AppError('Something went wrong', 500)
  return { user, token }
}

module.exports.loginUser = async (userData) => {
  const user = await User.authenticateUser(userData)
  const token = await user.generateAccessToken()

  return { user, token }
}

module.exports.fetchUserProfile = async (userId) => {
  const userProfile = await User.findById({ _id: userId }).select(
    '-password -role -updatedAt'
  )

  if (!userProfile) throw new AppError('User not found!', 404)

  return userProfile
}

module.exports.followUser = async (followerId, followedId) => {
  await User.findByIdAndUpdate(followerId, {
    $addToSet: { following: followedId },
  })

  return await User.findByIdAndUpdate(followedId, {
    $addToSet: { followers: followerId },
  }).select('-password -email -role -createdAt -updatedAt')
}

module.exports.unFollowUser = async (followerId, followedId) => {
  await User.findOneAndUpdate(followerId, {
    $pull: { following: followedId },
  })

  return await User.findOneAndUpdate(followedId, {
    $pull: { followers: followerId },
  }).select('-password -email -role -createdAt -updatedAt')
}

module.exports.fetchFollowing = async (userId) => {
  const followingList = await User.findById({ _id: userId })
    .select('following')
    .populate({
      path: 'following',
      select: '-email -password -role ',
    })

  return followingList
}

module.exports.fetchFollowers = async (userId) => {
  const followingList = await User.findById({ _id: userId })
    .select('followers')
    .populate({
      path: 'followers',
      select: '-email -password -role ',
    })

  return followingList
}

module.exports.editUserProfile = async (userId, updates) => {
  const updatedUser = await User.findByIdAndUpdate({ _id: userId }, updates, {
    new: true,
  })

  await updatedUser.save()

  return updatedUser
}

module.exports.changeUserPassword = async ({
  userId,
  savedPassword,
  currentPassword,
  newPassword,
}) => {
  const isMatch = await bcrypt.compare(currentPassword, savedPassword)
  if (!isMatch) throw new AppError('Wrong password.', 401)

  const hashedNewPassword = await bcrypt.hash(newPassword, 8)
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { password: hashedNewPassword },
    { new: true }
  )

  if (!user) throw new AppError('User not found.', 404)

  return user
}

module.exports.uploadUserAvatar = async () => {}
