import { Request, Response } from 'express'
import { tryCatch } from '../../utils/tryCatch'

import walletService from '../../services/walletService'
import { validateWallet } from '../../schema/connectWalletSchema'

export const getWallet = tryCatch(async (req: Request, res: Response) => {
  const resposne = await walletService.getWallet(req.user._id)
  return res.status(200).send(resposne)
})

export const connectWallet = tryCatch(async (req: Request, res: Response) => {
  const { error } = validateWallet(req.body)

  if (error) {
    throw new Error(error)
  }

  const walletData = {
    type: req.body.type,
    coin: req.body.coin,
    owner: req.user._id,
  }
  const resposne = await walletService.connectWallet(walletData)

  return res.status(201).send(resposne)
})

export const deleteWallet = tryCatch(async (req: Request, res: Response) => {
  const resposne = await walletService.deleteWallet(req.user._id)
  return res.status(200).send(resposne)
})
