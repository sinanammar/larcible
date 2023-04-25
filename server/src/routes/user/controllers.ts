import { Request, Response } from 'express'
import AppError from '../../AppError'

// Services
import userService from '../../services/userService'

// Schema validation
import { validateSignup } from '../../schema/registerUserSchema'
import { validateLogin } from '../../schema/loginUserSchema'
import { validateEdit } from '../../schema/editProfileSchema'
import { validateChangePassword } from '../../schema/changePasswordSchema'

import { tryCatch } from '../../utils/tryCatch'
import isValidObjectId from '../../utils/isValidObjectId'

export const registerUser = tryCatch(async (req: Request, res: Response) => {
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

export const loginUser = tryCatch(async (req: Request, res: Response) => {
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

export const logoutUser = tryCatch(async (req: Request, res: Response) =>
  res.clearCookie('jwt').send('Logged out successfully!'),
)

export const fetchUserProfile = tryCatch(async (req: Request, res: Response) => {
  const userId = req.params.id
  isValidObjectId(userId)

  const response = await userService.fetchUserProfile(userId)

  return res.status(200).send(response)
})

export const followUser = tryCatch(async (req: Request, res: Response) => {
  const followerId = req.user._id
  const followedId = req.params.id
  isValidObjectId(followedId)
  const resposne = await userService.followUser(followerId, followedId)

  res.status(200).send(resposne)
})

export const unFollowUser = tryCatch(async (req: Request, res: Response) => {
  const followerId = req.user._id
  const followedId = req.params.id
  isValidObjectId(followedId)
  const resposne = await userService.unFollowUser(followerId, followedId)

  return res.status(200).send(resposne)
})

export const fetchFollowing = tryCatch(async (req: Request, res: Response) => {
  const userId = req.params.id
  isValidObjectId(userId)
  const response = await userService.fetchFollowing(userId)

  return res.status(200).send(response)
})

export const fetchFollowers = tryCatch(async (req: Request, res: Response) => {
  const userId = req.params.id
  isValidObjectId(userId)
  const response = await userService.fetchFollowers(userId)

  return res.status(200).send(response)
})

export const editUserProfile = tryCatch(async (req: Request, res: Response) => {
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

export const changeUserPassword = tryCatch(async (req: Request, res: Response) => {
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

export const uploadUserAvatar = tryCatch(async (req: Request, res: Response) => {
  const response = await userService.uploadUserAvatar(req.user, req.file!.filename)
  return res.status(200).send(response)
})

export const getUserAvatar = tryCatch(async (req: Request, res: Response) => {
  const response = await userService.getUserAvatar(req.user)
  return res.status(200).send(response)
})

export const deleteUserAvatar = tryCatch(async (req: Request, res: Response) => {
  const response = await userService.deleteUserAvatar(req.user)
  return res.status(200).send(response)
})

export const deleteAccount = tryCatch(async (req: Request, res: Response) => {
  const response = await userService.deleteAccount(req.user._id)
  return res.status(200).send(response)
})

export const getCreatedNFTs = tryCatch(async (req: Request, res: Response) => {
  const userId = req.params.userId.trim()
  isValidObjectId(userId)

  const response = await userService.getCreatedNFTs(userId, req.paginationInfo)
  const result = {
    response,
    ...req.paginationInfo,
  }
  return res.status(200).send(result)
})

export const getOwnedNFTs = tryCatch(async (req: Request, res: Response) => {
  const response = await userService.getOwnedNFTs(req.user._id, req.paginationInfo)
  const result = {
    response,
    ...req.paginationInfo,
  }

  return res.status(200).send(result)
})

// export const name = tryCatch(async (req: Request, res: Response) => {})
