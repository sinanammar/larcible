import mongoose, { Schema, Document, Types, Model } from 'mongoose'

export interface ITransaction extends Document {
  from: mongoose.Types.ObjectId
  to: mongoose.Types.ObjectId
  amount: number
  item: mongoose.Types.ObjectId
  status: string
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
    status: {
      type: String,
      enum: ['success', 'fail'],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// Amount is quivalent to price in the design
// use the ids to

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema)

export default Transaction
