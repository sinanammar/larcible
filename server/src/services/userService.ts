import bcrypt from 'bcrypt'
import User from '../models/user'
import AppError from '../AppError'

// Interfaces
import { IUser, IUserMethods } from '../types/user.interface'
import { ChangePasswordInterface } from '../types/changePassword.interface'

const registerUser = async (userData: IUser) => {
  const user = new User(userData)

  const token = user.generateAccessToken()
  await user.save()

  if (!user) throw new AppError('Something went wrong', 500)
  return { user, token }
}

const loginUser = async ({
  firstname,
  password,
}: {
  firstname: string
  password: string
}) => {
  const user: IUserMethods = await User.authenticateUser(firstname, password)
  const token = user.generateAccessToken()

  return { user, token }
}

const fetchUserProfile = async (userId: string) => {
  const userProfile = await User.findById({ _id: userId }).select(
    '-password -role -updatedAt',
  )

  if (!userProfile) throw new AppError('User not found!', 404)

  return userProfile
}

const followUser = async (followerId: string, followedId: string) => {
  await User.findByIdAndUpdate(followerId, {
    $addToSet: { following: followedId },
  }).select('-avatar')

  const followedUser = await User.findByIdAndUpdate(followedId, {
    $addToSet: { followers: followerId },
  }).select('-password -email -role -createdAt -updatedAt')

  return followedUser
}

const unFollowUser = async (followerId: any, followedId: any) => {
  await User.findOneAndUpdate(followerId, {
    $pull: { following: followedId },
  })

  const unFollowedUser = await User.findOneAndUpdate(followedId, {
    $pull: { followers: followerId },
  }).select('-password -email -role -createdAt -updatedAt')

  return unFollowedUser
}

const fetchFollowing = async (userId: string) => {
  const followingList = await User.findById({ _id: userId })
    .select('following')
    .populate({
      path: 'following',
      select: '-email -password -role ',
    })

  return followingList
}

const fetchFollowers = async (userId: string) => {
  const followingList = await User.findById({ _id: userId })
    .select('followers')
    .populate({
      path: 'followers',
      select: '-email -password -role ',
    })

  return followingList
}

const editUserProfile = async (
  userId: string,
  updates: { firstname: string; email: string },
) => {
  const updatedUser = await User.findByIdAndUpdate({ _id: userId }, updates, {
    new: true,
  })

  if (!updatedUser) {
    throw new AppError('User not found!', 404)
  }

  await updatedUser.save()

  return updatedUser
}

const changeUserPassword = async ({
  userId,
  savedPassword,
  currentPassword,
  newPassword,
}: ChangePasswordInterface) => {
  const isMatch = await bcrypt.compare(currentPassword, savedPassword)
  if (!isMatch) throw new AppError('Wrong password.', 401)

  const hashedNewPassword = await bcrypt.hash(newPassword, 8)
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { password: hashedNewPassword },
    { new: true },
  )

  if (!user) throw new AppError('User not found.', 404)

  return user
}

const uploadUserAvatar = async (user: IUser, buffer: any) => {
  user.avatar = buffer
  await user.save()
  return user
}

const getUserAvatar = async (user: IUser) => {
  if (!user.avatar) {
    return 'No avatar found!'
  }
  return user.avatar
}

const deleteUserAvatar = async (user: IUser) => {
  user.avatar = null
  await user.save()
  return user
}

const deleteAccount = async (userId: string) => {
  const deletedUser = await User.deleteOne({ _id: userId })
  return deletedUser
}

const getCreatedNFTs = async (userId: string) => {
  const createdNFTs = await User.findById(userId).select('created').populate({
    path: 'created',
  })

  return createdNFTs
}

const likeNFT = async (userId: string, nftId: string, user: IUser) => {
  const isLiked = user.likes.filter((like: string) => like.toString() === nftId)

  // if exists remove it from user likes
  if (isLiked.length) {
    const userLikes = user.likes.filter((like: string) => like.toString() !== nftId)
    user.likes = userLikes
    await user.save()
    return userLikes
  }

  // it it does not exist add item to user likes
  const trimmedNftId = nftId.trim()
  user.likes.push(trimmedNftId)
  await user.save()

  return user.likes
}

// const name = async () => {}

export default {
  loginUser,
  registerUser,
  followUser,
  unFollowUser,
  fetchFollowing,
  fetchFollowers,
  editUserProfile,
  changeUserPassword,
  uploadUserAvatar,
  getUserAvatar,
  deleteUserAvatar,
  deleteAccount,
  getCreatedNFTs,
  likeNFT,
  fetchUserProfile,
}
