import wallet from '../models/wallet'
import AppError from '../AppError'

export const verifyBuyerWalletFunds = async (userId: any) => {
  const buyerWallet = await wallet.findOne({ owner: userId })
  if (!buyerWallet) {
    throw new AppError(
      'Wallet does not exist, create a wallet to start buying&selling',
      404,
    )
  }

  if (buyerWallet.balance === 0) {
    throw new AppError('No sufficient funds to complete this operation!', 400)
  }

  return buyerWallet
}
