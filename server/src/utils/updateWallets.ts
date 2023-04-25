import { INft } from '../interfaces/nft.Interface'
import Wallet from '../models/wallet'

const updateWallets = async (
  nft: any,
  royaltiesCreatorPayment: number,
  nftOwnerPayment: number,
  currentOwnerId: number,
  buyerId: number,
) => {
  await Promise.all([
    Wallet.updateOne({ owner: currentOwnerId }, { $inc: { balance: nftOwnerPayment } }),
    Wallet.updateOne(
      { owner: nft.creator },
      { $inc: { balance: royaltiesCreatorPayment } },
    ),
    Wallet.updateOne({ owner: buyerId }, { $inc: { balance: -nft.price! as number } }),
  ])
}

export default updateWallets
