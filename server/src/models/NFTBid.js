const mongoose = require('mongoose')

const bidSchema = new mongoose.Schema({
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

const nftSchema = new mongoose.Schema({
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

module.exports = NFTBid
