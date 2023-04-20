import mongoose, { Schema, Document, Types, Model } from 'mongoose'

export interface ITransaction extends Document {
  from: Types.ObjectId
  to: Types.ObjectId
  amount: number
  item: Types.ObjectId
}

const transactionSchema = new mongoose.Schema<ITransaction>(
  {
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
    amount: {
      type: Number,
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NFT',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema)

export default Transaction
