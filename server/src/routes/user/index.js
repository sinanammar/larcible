const express = require('express')
const { authUser } = require('../../middleware/authUser')
const { upload } = require('../../utils/avatarMulterConfig')
const {
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
} = require('./controllers')

const router = express.Router()

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.post('/logout', authUser, logoutUser)
router.get('/profile/:id', authUser, fetchUserProfile)
router.post('/follow/:id', authUser, followUser)
router.delete('/unfollow/:id', authUser, unFollowUser)
router.get('/following/:id', authUser, fetchFollowing)
router.get('/followers/:id', authUser, fetchFollowers)
router.put('/edit/profile', authUser, editUserProfile)
router.patch('/change/password', authUser, changeUserPassword)
router.post(
  '/upload/avatar',
  authUser,
  upload.single('avatar'),
  uploadUserAvatar
)
// TODO: Add get, delete avatar endpoints
// Add Delete Account

// TODO: configure nodemailer to send an email on registration
// TODO: ADD forgot password path with a security password sent to email

module.exports = router
