const mongoose = require('mongoose')

const requiredValidator = (method) =>
  function () {
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
    type: String,
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
  collectionName: {
    type: String,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
})

const NFT = mongoose.model('NFT', nftSchema)

module.exports = NFT
