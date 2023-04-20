import { Schema } from 'express-validator'
import mongoose, { Types } from 'mongoose'

export interface IBid extends Document {
  from: Types.ObjectId
  to: Types.ObjectId
  bidDate: Date
  bidValue: number
}
export interface INFT extends Document, IBid {
  item: Types.ObjectId
  bids: IBid[]
}

const bidSchema = new mongoose.Schema<IBid>({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bidDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  bidValue: {
    type: Number,
    required: true,
  },
})

const nftSchema = new mongoose.Schema<INFT>({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NFT',
    required: true,
  },
  bids: {
    type: [bidSchema],
    default: [],
  },
})

const NFTBid = mongoose.model('NFTBid', nftSchema)

export default NFTBid
