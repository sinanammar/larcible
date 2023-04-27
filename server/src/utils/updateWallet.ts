import mongoose from 'mongoose'
import Wallet from '../models/wallet'

const updateWallet = async (walletId: mongoose.Types.ObjectId, amount: number) => {
  await Wallet.updateOne({ _id: walletId }, { $set: { balance: amount } })
}

export default updateWallet
