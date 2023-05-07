import express from 'express'

// Middleware
import authUser from '../../middleware/authUser'
import paginate from '../../middleware/paginate'

// Models
import NFT from '../../models/nft'

import authRouter from './auth'
import profileRouter from './profile'
import assetsRouter from './assets'

import cors from 'cors'

const router = express.Router()

import { registerUser } from './controllers'

router.post(
  '/signup',
  cors({
    origin: '*',
    methods: ['POST', 'GET'],
  }),
  registerUser,
)

router.use('/auth', authRouter)
router.use('/profile', authUser, profileRouter)
router.use('/assets', authUser, paginate(NFT), assetsRouter)

export default router
