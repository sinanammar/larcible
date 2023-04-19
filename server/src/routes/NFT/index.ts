import express from 'express'
import authUser from '../../middleware/authUser'
import {
  publishNft,
  getAllNFTs,
  getNFTDetails,
  getNFTsByCategory,
  placeBidOnNFT,
} from './controller'

const router = express.Router()

router.get('/all', getAllNFTs)
router.post('/upload', authUser, publishNft)
router.get('/:nftId', getNFTDetails)
router.get('/category/:cat', getNFTsByCategory)

router.post('/bid/:nftId', authUser, placeBidOnNFT)

export default router
