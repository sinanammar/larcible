import wallet from '../models/wallet'
import AppError from '../AppError'

export const verifyUserWalletFunds = async (userId: any) => {
  const userWallet = await wallet.findOne({ owner: userId })
  if (!userWallet) {
    throw new AppError(
      'Wallet does not exist, create a wallet to start buying&selling',
      404,
    )
  }

  if (userWallet.balance === 0) {
    throw new AppError('No sufficient funds to complete this operation!', 400)
  }

  return userWallet
}
