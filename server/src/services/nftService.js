const NFT = require('../models/nft')
const NFTBid = require('../models/NFTBid')

const AppError = require('../AppError')

module.exports.getAllNFTs = async () => {
  const NFTs = await NFT.find()
  return NFTs
}

module.exports.publishNft = async (nftData, user) => {
  const nft = NFT(nftData)
  await nft.save()

  if (!nft) {
    throw new AppError('Something went wrong, try again shortly', 500)
  }

  // Adding the NFT id to the user profile
  user.created.push(nft._id)
  // TODO: When a user lists an NFT for sale the item ID goes into the created and on-sale attributes in the model
  // When it gets purchased remove the id from the current holder on-sale property and add it to the buyer
  user.onSale.push(nft._id)
  await user.save()

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

module.exports.placeBidOnNFT = async ({ bidderId, nftId, bidValue }) => {
  // TODO: Check if the user has enough balance - add it in utils since i will use it more than one time
  // Check if the bid is higher than the minimium
  const { owner } = await NFT.findById(nftId).select('owner')

  const bid = {
    from: bidderId,
    to: owner,
    bidDate: Date.now(),
    bidValue,
  }
  const options = { upsert: true, new: true }

  const findOrPlaceBid = await NFTBid.findOneAndUpdate(
    { item: nftId },
    { $push: { bids: bid } },
    options,
  )

  return findOrPlaceBid
}
