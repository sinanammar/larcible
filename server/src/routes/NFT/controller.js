const { tryCatch } = require('../../utils/tryCatch')

const nftService = require('../../services/nftService')

module.exports.uploadPhoto = tryCatch(async (req, res) => {})

module.exports.getAllNfts = tryCatch(async (req, res) => {
  const response = await nftService.getAllNfts()

  return res.status(200).send(response)
})

module.exports.getNftDetails = tryCatch(async (req, res) => {
  const contractAddress = req.query.contractAddress
  const tokenId = req.query.tokenId

  console.log(req.query)

  const response = await nftService.getNftDetails(tokenId, contractAddress)

  return res.status(200).send(response)
})

module.exports.getTopRankingNfts = tryCatch(async (req, res) => {
  const pageNumber = req.query.pageNumber
  const timeFrame = req.query.timeFrame

  console.log(req.query)
  const response = await nftService.getTopRankingNfts(pageNumber, timeFrame)

  return res.status(200).send(response)
})
