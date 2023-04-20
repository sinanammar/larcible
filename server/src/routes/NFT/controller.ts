import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { tryCatch } from '../../utils/tryCatch'

import nftService from '../../services/nftService'
import { validateNft } from '../../schema/nftSchema'
import { validateBid } from '../../schema/nftBidSchema'

export const getAllNFTs = tryCatch(async (req: Request, res: Response) => {
  const response = await nftService.getAllNFTs()
  return res.status(200).send(response)
})

export const publishNft = tryCatch(async (req: Request, res: Response) => {
  const { error } = validateNft(req.body)

  if (error) {
    throw new Error(error)
  }

  const nftData = req.body
  nftData.owner = req.user._id
  nftData.photo = req.file
  nftData.creator = req.user._id

  const response = await nftService.publishNFT(nftData, req.user)
  return res.status(201).send(response)
})

export const getNFTDetails = tryCatch(async (req: Request, res: Response) => {
  const response = await nftService.getNFTDetails(req.params.nftId)
  return res.status(200).send(response)
})

export const getNFTsByCategory = tryCatch(async (req: Request, res: Response) => {
  const { cat } = req.params
  const response = await nftService.getNFTsByCategory(cat)

  return res.status(200).send(response)
})

export const placeBidOnNFT = tryCatch(async (req: Request, res: Response) => {
  isValidObjectId(req.params.nftId)
  const { error } = validateBid(req.body)

  if (error) {
    throw new Error(error)
  }

  const bidData = {
    bidderId: req.user._id,
    nftId: req.params.nftId,
    bidValue: req.body.bidValue,
  }
  const response = await nftService.placeBidOnNFT(bidData)

  return res.status(201).send(response)
})

export const purchaseNFT = tryCatch(async (req: Request, res: Response) => {
  const { nftId } = req.params
  isValidObjectId(nftId)

  const response = await nftService.purchaseNFT(nftId, req.user)
  return res.status(200).send(response)
})

export const toggleNFTStatus = tryCatch(async (req: Request, res: Response) => {
  const { nftId } = req.params
  isValidObjectId(nftId)

  const response = await nftService.toggleNFTStatus(nftId, req.user)
  return res.status(200).send(response)
})
