import mongoose, { Schema, Document, Types, Model } from 'mongoose'

export interface ICoin {
  type: 'BTC' | 'ETH' | 'XRP' | 'LTC' | 'BCH'
  balance: number
}

export interface IWallet extends Document {
  type: string
  balance?: number
  coin: string
  // coins: ICoin[]
  owner: mongoose.Schema.Types.ObjectId
}

const WALLET_ENUM = ['Metamask', 'Bitski', 'Alpha', 'Enjin', 'Wallet Connect', 'CoinBase']

const WalletSchema: Schema = new Schema<IWallet, Model<IWallet>>(
  {
    type: {
      type: String,
      enum: WALLET_ENUM,
      message: 'Invalid wallet type.',
      required: true,
    },
    balance: {
      type: Number,
      default: 100000,
      min: [0, 'Balance cannot be negative.'],
    },
    coin: {
      type: String,
      required: true,
      enum: ['BTC', 'ETH', 'XRP', 'LTC', 'BCH'],
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

export default mongoose.model<IWallet>('Wallet', WalletSchema)
