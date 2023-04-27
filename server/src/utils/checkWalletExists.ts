import AppError from '../AppError'
import wallet from '../models/wallet'
import { ObjectId } from 'mongoose'
import mongoose from 'mongoose'

const checkWalletExists = async (userId: mongoose.Types.ObjectId, dealRole: string) => {
  const userWallet = await wallet.findOne({ owner: userId })

  if (!userWallet) {
    throw new AppError(`Transactinon failed! ${dealRole} wallet does not exist.`, 404)
  }

  return userWallet
}

export default checkWalletExists
