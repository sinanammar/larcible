import AppError from '../AppError'
import Wallet from '../models/wallet'
import { IWallet } from '../models/wallet'
import mongoose from 'mongoose'

const getWallet = async (userId: string) => {
  const wallet = await Wallet.findOne({ owner: userId })

  if (!wallet) {
    throw new AppError('No wallet found!', 404)
  }

  return wallet
}

const connectWallet = async (walletData: {
  type: string
  coin: string
  owner: mongoose.Types.ObjectId
}) => {
  const isExit = await Wallet.findOne({ owner: walletData.owner })

  if (isExit) {
    throw new AppError('User already has a wallet', 400)
  }

  const wallet = new Wallet(walletData)
  if (!wallet) {
    throw new AppError('Something went wrong!', 500)
  }

  await wallet.save()
  return wallet
}

const deleteWallet = async (userId: string) => {
  const wallet = await Wallet.findOneAndRemove({ owner: userId })

  if (!wallet) {
    throw new AppError('No wallet found!', 400)
  }

  return true
}

export default { getWallet, connectWallet, deleteWallet }
