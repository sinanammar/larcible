import express from 'express'
import { upload } from '../../utils/avatarMulterConfig'
import {
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
} from './controllers'

const router = express.Router()

router.get('/:id', fetchUserProfile)
router.post('/follow/:id', followUser)
router.delete('/unfollow/:id', unFollowUser)
router.get('/following/:id', fetchFollowing)
router.get('/followers/:id', fetchFollowers)
router.put('/edit-profile', editUserProfile)
router.patch('/change-password', changeUserPassword)
router.get('/avatar', getUserAvatar)
router.delete('/avatar', deleteUserAvatar)
router.post('/upload/avatar', upload.single('avatar'), uploadUserAvatar)
router.delete('/delete-account', deleteAccount)

export default router
