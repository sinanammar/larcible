import express from 'express'

// Models
import NFT from '../../models/nft'

// Middleware
import authUser from '../../middleware/authUser'
import paginate from '../../middleware/paginate'

import { uploadNFT } from '../../utils/nftMulterConfig'
import {
  createNFT,
  getAllNFTs,
  getNFTDetails,
  getNFTsByCategory,
  placeBidOnNFT,
  purchaseNFT,
  toggleNFTStatus,
  placeOpenBidOnNFT,
  acceptBid,
  likeNFT,
  getTransactions,
} from './controller'

const router = express.Router()

router.get('/all', paginate(NFT), getAllNFTs)
router.post('/upload', authUser, uploadNFT.single('nft'), createNFT)
router.get('/:nftId', getNFTDetails)
router.get('/category/:cat', paginate(NFT), getNFTsByCategory)
router.post('/bid/:nftId', authUser, placeBidOnNFT)
router.post('/purchase/:nftId', authUser, purchaseNFT)
router.patch('/toggle-status/:nftId', authUser, toggleNFTStatus)
router.post('/open-bid/:nftId', authUser, placeOpenBidOnNFT)
router.post('/accept/open-bid/:nftId/:bidderId/:bidAmount', authUser, acceptBid)
router.post('/like/:nftId', authUser, likeNFT)
router.get('/activity', authUser, paginate(NFT), getTransactions) // Needs Pagination

export default router
