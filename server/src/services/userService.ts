import AppError from '../AppError'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
// Models
import User from '../models/user'

// Interfaces
import { IUser, IUserMethods } from '../interfaces/user.interface'
import { ChangePasswordInterface } from '../interfaces/changePassword.interface'
import { IPagination } from '../interfaces/pagination.interface'

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

const uploadUserAvatar = async (user: IUser, avatarPath: string) => {
  user.avatar = avatarPath
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

const getCreatedNFTs = async (userId: string, { startIndex, next }: IPagination) => {
  const createdNFTs = await User.findById(userId)
    .select('created')
    .populate({
      path: 'created',
      options: {
        limit: next.limit,
        skip: startIndex,
      },
    })

  return createdNFTs
}

const getOwnedNFTs = async (userId: string, { startIndex, next }: IPagination) => {
  const ownedNFTs = await User.find({ _id: userId })
    .select('ownedNFTs')
    .populate({
      path: 'ownedNFTs',
      options: {
        limit: next.limit,
        skip: startIndex,
      },
    })
  return ownedNFTs
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
  fetchUserProfile,
  getOwnedNFTs,
}
