import express from 'express'

const router = express.Router()

import { getCreatedNFTs, getOwnedNFTs } from './controllers'

router.get('/orders', getOwnedNFTs)
router.get('/created/:userId', getCreatedNFTs)

export default router
