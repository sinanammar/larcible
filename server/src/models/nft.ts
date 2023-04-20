import { boolean } from 'joi'
import mongoose from 'mongoose'

const requiredValidator = (method: string) =>
  function (this: { sellingMethod: string }) {
    return this.sellingMethod === method
  }

const nftSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: 'onSale',
    enum: [true ? 'onSale' : 'hold'],
  },
  image: {
    type: Buffer,
    // required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  royalties: {
    type: Number,
    required: true,
  },
  sellingMethod: {
    type: String,
    required: true,
    enum: ['Fixed price', 'Time auction', 'Open for bid'],
  },
  // properties for Fixed Price
  category: {
    type: String,
    required: requiredValidator('Fixed price'),
  },
  size: {
    type: String,
    required: requiredValidator('Fixed price'),
  },
  price: {
    type: Number,
    required: requiredValidator('Fixed price'),
  },
  // properties for Time auction
  startingDate: {
    type: Date,
    required: requiredValidator('Time auction'),
  },
  endingDate: {
    type: Date,
    required: requiredValidator('Time auction'),
  },
  minimumBid: {
    type: Number,
    required: requiredValidator('Time auction'),
  },
  currentPrice: {
    type: Number,
    default(this: { minimumBid: string }) {
      return this.minimumBid
    },
    required: requiredValidator('Time auction'),
  },

  collectionName: {
    type: String,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const NFT = mongoose.model('NFT', nftSchema)

export default NFT
