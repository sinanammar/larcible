import express from 'express'
import authUser from '../../middleware/authUser'
import { registerUser, loginUser, logoutUser } from './controllers'

const router = express.Router()

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.post('/logout', authUser, logoutUser)

export default router
