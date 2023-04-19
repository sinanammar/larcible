import AppError from '../AppError'

import NFT from '../models/nft'
import NFTBid from '../models/NFTBid'

import { IBid, INft } from '../types/nftInterface'
import { UserInterface } from '../types/user.interface'

const getAllNFTs = async () => {
  const NFTs = await NFT.find()
  return NFTs
}

const publishNft = async (nftData: INft, user: UserInterface) => {
  const nft = new NFT(nftData)
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

const getNFTDetails = async (nftId: string) => {
  const nft = await NFT.findById({ _id: nftId })

  if (!nft) {
    throw new AppError('Item not found!', 404)
  }

  return nft
}

const getNFTsByCategory = async (category: string) => {
  const nft = await NFT.find({ category })

  if (!nft) {
    throw new AppError('Item not found!', 404)
  }

  return nft
}

const placeBidOnNFT = async ({ bidderId, nftId, bidValue }: IBid) => {
  // TODO: Check if the user has enough balance - add it in utils since i will use it more than one time
  // Check if the bid is higher than the minimium
  const { owner }: any = await NFT.findById(nftId).select('owner')

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

export default {
  getAllNFTs,
  publishNft,
  getNFTDetails,
  getNFTsByCategory,
  placeBidOnNFT,
}
