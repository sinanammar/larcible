import express from 'express'
// Middleware
import authUser from '../../middleware/authUser'
import paginate from '../../middleware/paginate'

// Models
import User from '../../models/user'
import NFT from '../../models/nft'

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
  getOwnedNFTs,
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
router.get('/orders', authUser, paginate(NFT), getOwnedNFTs)
router.get('/created/:userId', authUser, paginate(NFT), getCreatedNFTs)

export default router
