const express = require('express')
const { authUser } = require('../../middleware/authUser')

const {
  publishNft,
  getAllNFTs,
  getNFTDetails,
  getNFTsByCategory,
} = require('./controller')

const router = express.Router()

router.get('/all', getAllNFTs)
router.post('/upload', authUser, publishNft)
router.get('/:nftId', getNFTDetails)
router.get('/category/:cat', getNFTsByCategory)

module.exports = router
