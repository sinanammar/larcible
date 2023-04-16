const NFT = require('../models/nft')
const AppError = require('../AppError')

module.exports.getAllNFTs = async () => {
  const NFTs = await NFT.find()
  return NFTs
}

module.exports.publishNft = async (nftData) => {
  const nft = NFT(nftData)
  await nft.save()

  if (!nft) {
    throw new AppError('Something went wrong, try again shortly', 500)
  }

  return nft
}

module.exports.getNFTDetails = async (nftId) => {
  const nft = await NFT.findById({ _id: nftId })

  if (!nft) {
    throw new AppError('Item not found!', 404)
  }

  return nft
}

module.exports.getNFTsByCategory = async (category) => {
  const nft = await NFT.find({ category })

  if (!nft) {
    throw new AppError('Item not found!', 404)
  }

  return nft
}
