const { isValidObjectId } = require('mongoose')
const { tryCatch } = require('../../utils/tryCatch')

const nftService = require('../../services/nftService')
const { validateNft } = require('../../schema/nftSchema')
const { validateBid } = require('../../schema/nftBidSchema')

module.exports.getAllNFTs = tryCatch(async (req, res) => {
  console.log('Hit')
  const response = await nftService.getAllNFTs()
  return res.status(200).send(response)
})

module.exports.publishNft = tryCatch(async (req, res) => {
  const { error } = validateNft(req.body)

  if (error) {
    throw new Error(error)
  }

  const nftData = req.body
  nftData.owner = req.user._id
  nftData.photo = req.file

  const response = await nftService.publishNft(nftData, req.user)
  return res.status(201).send(response)
})

module.exports.getNFTDetails = tryCatch(async (req, res) => {
  const response = await nftService.getNFTDetails(req.params.nftId)
  return res.status(200).send(response)
})

module.exports.getNFTsByCategory = tryCatch(async (req, res) => {
  const { cat } = req.params
  const response = await nftService.getNFTsByCategory(cat)

  return res.status(200).send(response)
})

module.exports.placeBidOnNFT = tryCatch(async (req, res) => {
  isValidObjectId(req.params.nftId)
  const { error } = validateBid(req.body)

  if (error) {
    throw new Error(error)
  }

  const bidData = {
    bidderId: req.user._id,
    nftId: req.params.nftId,
    bidValue: req.body.bidValue,
  }
  const response = await nftService.placeBidOnNFT(bidData)

  return res.status(201).send(response)
})
