import mongoose from 'mongoose'
import AppError from '../AppError'

// Models
import NFT from '../models/nft'
import NFTBid from '../models/NFTBid'
import User from '../models/user'
import wallet from '../models/wallet'
import Transaction from '../models/transaction'

// Interfaces
import { IBid, INft } from '../types/nftInterface'
import { IUser } from '../types/user.interface'
import { ITransaction } from '../models/transaction'

import { verifyUserWalletFunds } from '../utils/verifyUserWalletFunds'

const getAllNFTs = async () => {
  const NFTs = await NFT.find()
  return NFTs
}

const publishNFT = async (nftData: INft, user: IUser) => {
  const userWallet = await wallet.findOne({ owner: user._id })

  if (!userWallet) {
    throw new AppError('User need to connect a wallet before creating an NFT', 400)
  }

  const nft = new NFT(nftData)
  await nft.save()

  if (!nft) {
    throw new AppError('Something went wrong, try again shortly', 500)
  }

  // Adding the NFT id to the user profile
  user.created.push(nft._id)
  user.ownedNFTs.push(nft._id)
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

// TODO: Subtract the amount from the bidder wallet/ freeze it till the aution ends
const placeBidOnNFT = async ({ bidderId, nftId, bidValue }: IBid) => {
  await verifyUserWalletFunds(bidderId)

  const nft = await NFT.findById(nftId)

  if (!nft) {
    throw new AppError('NFT not found!', 404)
  }

  if (nft.sellingMethod === 'Fixed price') {
    throw new AppError("Can't place a bid on fixed price assets", 400)
  }

  if (bidValue < nft.minimumBid!) {
    throw new AppError('Bid value must be greater than the minimum bid value', 400)
  }

  // calculating the total current price
  nft.currentPrice = nft.currentPrice + parseFloat(bidValue.toString())
  await nft.save()

  const bid = {
    from: bidderId,
    to: nft.owner,
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

// Fixed price
const purchaseNFT = async (nftId: string, buyer: IUser) => {
  const buyerWallet = await verifyUserWalletFunds(buyer._id)

  const nft = await NFT.findById(nftId)
  if (!nft) {
    throw new AppError('NFT not found!', 404)
  }

  if (nft.sellingMethod !== 'Fixed price') {
    throw new AppError('NFT has to be sold as Fixed price', 400)
  }

  if (!(buyerWallet.balance! >= nft.price!)) {
    throw new AppError('No sufficient funds!', 400)
  }

  const currentOwner = await User.findById({ _id: nft.owner })
  if (!currentOwner) {
    throw new AppError('Something went wrong!', 500)
  }

  const nftObjectId = new mongoose.Types.ObjectId(nftId)

  // Update the wallets
  await Promise.all([
    wallet.updateOne({ owner: currentOwner._id }, { $inc: { balance: nft.price } }),
    wallet.updateOne({ owner: buyer._id }, { $inc: { balance: -nft.price! } }),
  ])

  // Converting IDs to Object IDs
  const buyerObjectId = new mongoose.Types.ObjectId(buyer._id)
  const ownerObjectId = new mongoose.Types.ObjectId(currentOwner._id)

  // Transfer the ownership of the NFT
  await currentOwner.updateOne({
    $pull: { ownedNFTs: nftObjectId },
  })

  buyer.ownedNFTs.push(nftObjectId)
  await buyer.save()

  nft.owner = buyerObjectId
  await nft.save()

  // Registe trnsaction
  const transactionData = {
    from: buyerObjectId,
    to: ownerObjectId,
    amount: nft.price!,
    item: nftObjectId,
  } as ITransaction

  const transaction = new Transaction(transactionData)
  await transaction.save()

  return transaction
}

const toggleNFTStatus = async (nftId: string, owner: IUser) => {
  const ownerObjectId = new mongoose.Types.ObjectId(owner._id)
  const nftObjectId = new mongoose.Types.ObjectId(nftId)

  const nft = await NFT.findOne({ _id: nftObjectId })

  if (!nft) {
    throw new AppError('NFT not found', 400)
  }

  if (!ownerObjectId.equals(nft.owner)) {
    throw new AppError('Unauthorized operation!', 401)
  }

  // Reversing the status - OnSale / Hold
  nft.status = !nft.status
  await nft.save()

  return true
}

export default {
  getAllNFTs,
  publishNFT,
  getNFTDetails,
  getNFTsByCategory,
  placeBidOnNFT,
  purchaseNFT,
  toggleNFTStatus,
}
