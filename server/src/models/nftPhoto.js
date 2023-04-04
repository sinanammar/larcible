const mongoose = require('mongoose')

const nftPhotoSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  nftId: {
    type: String,
  },
  nftContractAddress: {
    type: String,
  },
  nftTransactionHash: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const nftPhoto = mongoose.model('nftPhoto', nftPhotoSchema)

module.exports = nftPhoto
