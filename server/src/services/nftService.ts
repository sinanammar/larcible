import mongoose from 'mongoose'
import AppError from '../AppError'

// Models
import NFT from '../models/nft'
import NFTBid from '../models/NFTBid'
import User from '../models/user'
import Wallet from '../models/wallet'
import Transaction from '../models/transaction'

// Interfaces
import { IBid, INft } from '../interfaces/nft.Interface'
import { IUser } from '../interfaces/user.interface'
import { ITransaction } from '../models/transaction'
import { IPagination } from '../interfaces/pagination.interface'

import { verifyUserWalletFunds } from '../utils/verifyUserWalletFunds'
import updateWallets from '../utils/updateWallets'

const getAllNFTs = async ({ next, startIndex }: IPagination) => {
  const NFTs = await NFT.find().limit(next.limit).skip(startIndex)
  return NFTs
}

const publishNFT = async (nftData: INft, user: IUser) => {
  const userWallet = await Wallet.findOne({ owner: user._id })

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

const getNFTsByCategory = async (
  category: string,
  {
    startIndex,
    next,
  }: {
    next: { limit: number; page: number }
    startIndex: number
  },
) => {
  const nft = await NFT.find({ category }).limit(next.limit).skip(startIndex)
  if (!nft) {
    throw new AppError('Item not found!', 404)
  }

  return nft
}

// TODO: Subtract the amount from the bidder wallet/ freeze it till the aution ends
// TODO: write an API to transform the ownership once the auction time-frame finishes
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
    throw new AppError('NFT has to be listed as Fixed price', 400)
  }

  if (!(buyerWallet.balance! >= nft.price!)) {
    throw new AppError('No sufficient funds!', 400)
  }

  const currentOwner = await User.findById({ _id: nft.owner })
  if (!currentOwner) {
    throw new AppError('Something went wrong!', 500)
  }

  const royaltiesCreatorPayment = (nft.royalties * nft.price!) / 100
  const nftOwnerPayment = nft.price! - royaltiesCreatorPayment

  // Updating the wallets - Payments goes to NFT owner & creator
  await Promise.all([
    Wallet.updateOne({ owner: currentOwner._id }, { $inc: { balance: nftOwnerPayment } }),
    Wallet.updateOne(
      { owner: nft.creator },
      { $inc: { balance: royaltiesCreatorPayment } },
    ),
    Wallet.updateOne({ owner: buyer._id }, { $inc: { balance: -nft.price! } }),
  ])

  // Converting IDs to Object IDs
  const nftObjectId = new mongoose.Types.ObjectId(nftId)
  const buyerObjectId = new mongoose.Types.ObjectId(buyer._id)
  const ownerObjectId = new mongoose.Types.ObjectId(currentOwner._id)

  // Transfer NFT ownership
  await currentOwner.updateOne({
    $pull: { ownedNFTs: nftObjectId },
  })

  buyer.ownedNFTs.push(nftObjectId)
  await buyer.save()

  nft.owner = buyerObjectId
  await nft.save()

  // Register trnsaction
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
    throw new AppError('NFT not found', 404)
  }

  if (!ownerObjectId.equals(nft.owner)) {
    throw new AppError('Unauthorized operation!', 401)
  }

  // Reversing the status - OnSale / Hold
  nft.status = !nft.status
  await nft.save()

  return true
}

// Use Socket.io
const placeOpenBidOnNFT = async (nftId: string, buyer: IUser, bidValue: number) => {
  const buyerWallet = await verifyUserWalletFunds(buyer._id)
  const nftObjectId = new mongoose.Types.ObjectId(nftId)

  const nft = await NFT.findById(nftObjectId)
  if (!nft) {
    throw new AppError('NFT not found!', 404)
  }

  if (nft.sellingMethod !== 'Open for bid') {
    throw new AppError('NFT has to be listed as Open for bid', 400)
  }

  console.log('Hit')
  // Use Socket.io to manage sending notification to the owner
  return true
}

// on the client this will be triggered whenever a user Accepts an Open bid
// Repeated code
const acceptBid = async ({ nftId, bidderId, bidValue }: IBid, currentOwner: IUser) => {
  await verifyUserWalletFunds(bidderId)

  const ownerObjectId = new mongoose.Types.ObjectId(currentOwner._id)
  const bidderObjectId = new mongoose.Types.ObjectId(bidderId)
  const nftObjectId = new mongoose.Types.ObjectId(nftId)

  const bidder = await User.findOne(bidderObjectId)

  if (!bidder) {
    throw new AppError('Bidder account not found!', 404)
  }

  const nft = await NFT.findOne({ _id: nftObjectId })

  if (!nft) {
    throw new AppError('NFT not found', 404)
  }

  if (!ownerObjectId.equals(nft.owner)) {
    throw new AppError('Unauthorized operation!', 401)
  }

  const royaltiesCreatorPayment = (nft.royalties * bidValue) / 100
  const nftOwnerPayment = (bidValue - royaltiesCreatorPayment) as Number

  await Promise.all([
    Wallet.updateOne({ owner: currentOwner._id }, { $inc: { balance: nftOwnerPayment } }),
    Wallet.updateOne(
      { owner: nft.creator },
      { $inc: { balance: royaltiesCreatorPayment } },
    ),
    Wallet.updateOne({ owner: bidderObjectId }, { $inc: { balance: -bidValue } }),
  ])

  // Transfer NFT ownership
  await currentOwner.updateOne({
    $pull: { ownedNFTs: nftObjectId },
  })

  bidder.ownedNFTs.push(nftObjectId)
  await bidder.save()

  nft.owner = bidderObjectId
  await nft.save()

  // Register trnsaction
  const transactionData = {
    from: bidderObjectId,
    to: ownerObjectId,
    amount: bidValue,
    item: nftObjectId,
  } as ITransaction

  const transaction = new Transaction(transactionData)
  await transaction.save()

  return transaction
}

const likeNFT = async (userId: string, nftId: string, user: IUser) => {
  const isLiked = user.likes.filter((like: string) => like.toString() === nftId)

  // if exists remove it from user likes
  if (isLiked.length) {
    const userLikes = user.likes.filter((like: string) => like.toString() !== nftId)
    user.likes = userLikes
    await user.save()
    return userLikes
  }

  // it it does not exist add item to user likes
  const trimmedNftId = nftId.trim()
  user.likes.push(trimmedNftId)
  await user.save()

  return user.likes
}

// Cast to ObjectId failed for value "{ _id: 'activity' }" (type Object) at path "_id" for model "NFT"
const getTransactions = async ({
  next,
  startIndex,
}: {
  next: { limit: number; page: number }
  startIndex: number
}) => {
  const transactions = await Transaction.find()
    .populate('from', 'firstname email _id')
    .populate('to', 'firstname email _id')
    .populate({
      path: 'item',
      select: 'image',
    })
    .limit(next.limit)
    .skip(startIndex)
  return transactions
}

export default {
  publishNFT,
  getNFTDetails,
  getNFTsByCategory,
  placeBidOnNFT,
  purchaseNFT,
  toggleNFTStatus,
  placeOpenBidOnNFT,
  acceptBid,
  likeNFT,
  getAllNFTs,
  getTransactions,
}
