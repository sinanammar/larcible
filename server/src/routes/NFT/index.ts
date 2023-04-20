import express from 'express'
import authUser from '../../middleware/authUser'
import {
  publishNft,
  getAllNFTs,
  getNFTDetails,
  getNFTsByCategory,
  placeBidOnNFT,
  purchaseNFT,
  toggleNFTStatus,
} from './controller'

const router = express.Router()

router.get('/all', getAllNFTs)
router.post('/upload', authUser, publishNft)
router.get('/:nftId', getNFTDetails)
router.get('/category/:cat', getNFTsByCategory)
router.post('/bid/:nftId', authUser, placeBidOnNFT)
router.post('/purchase/:nftId', authUser, purchaseNFT)
router.patch('/toggle-status/:nftId', authUser, toggleNFTStatus)

export default router
