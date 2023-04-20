import express from 'express'
import authUser from '../../middleware/authUser'

import { upload } from '../../utils/avatarMulterConfig'
import {
  registerUser,
  loginUser,
  logoutUser,
  followUser,
  unFollowUser,
  fetchFollowing,
  fetchUserProfile,
  fetchFollowers,
  editUserProfile,
  changeUserPassword,
  uploadUserAvatar,
  deleteUserAvatar,
  getUserAvatar,
  deleteAccount,
  getCreatedNFTs,
  likeNFT,
} from './controllers'

const router = express.Router()

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.post('/logout', authUser, logoutUser)
router.get('/profile/:id', authUser, fetchUserProfile)
router.post('/follow/:id', authUser, followUser)
router.delete('/unfollow/:id', authUser, unFollowUser)
router.get('/following/:id', authUser, fetchFollowing)
router.get('/followers/:id', authUser, fetchFollowers)
router.put('/edit-profile', authUser, editUserProfile)
router.patch('/change-password', authUser, changeUserPassword)
router.get('/avatar', authUser, getUserAvatar)
router.delete('/avatar', authUser, deleteUserAvatar)
router.post('/upload/avatar', authUser, upload.single('avatar'), uploadUserAvatar)
router.delete('/delete-account', authUser, deleteAccount)

router.get('/created/:userId', getCreatedNFTs)
router.post('/like/:nftId', authUser, likeNFT)

// TODO: configure nodemailer to send an email on registration
// TODO: ADD forgot password path with a security password sent to email
// sign in from google/facebook - 'remember me' feature
// Add to User model -> Wallet,

export default router
