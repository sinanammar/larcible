import { Request, Response } from 'express'

import isValidObjectId from '../../utils/isValidObjectId'
import { tryCatch } from '../../utils/tryCatch'

import nftService from '../../services/nftService'

import { validateNft } from '../../schema/nftSchema'
import { validateBid } from '../../schema/nftBidSchema'
import AppError from '../../AppError'

export const getAllNFTs = tryCatch(async (req: Request, res: Response) => {
  const response = await nftService.getAllNFTs(req.paginationInfo)
  const results = {
    result: response,
    ...req.paginationInfo,
  }
  console.log(req.paginationInfo)
  return res.status(200).send(results)
})

export const publishNft = tryCatch(async (req: Request, res: Response) => {
  const { error } = validateNft(req.body)

  if (error) {
    throw new Error(error)
  }

  const nftData = req.body
  nftData.owner = req.user._id
  // nftData.image = req.file!.filename
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
  const response = await nftService.getNFTsByCategory(cat, req.paginationInfo)

  const result = {
    response,
    ...req.paginationInfo,
  }

  return res.status(200).send(result)
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

export const placeOpenBidOnNFT = tryCatch(async (req: Request, res: Response) => {
  const { nftId } = req.params
  const { bidValue } = req.body
  isValidObjectId(nftId)

  if (!bidValue || bidValue <= 0) {
    throw new AppError('Must provide a bid value', 400)
  }

  const response = await nftService.placeOpenBidOnNFT(nftId, req.user, bidValue)
  return res.status(200).send(response)
})

export const acceptBid = tryCatch(async (req: Request, res: Response) => {
  const { nftId, bidderId, bidAmount } = req.params
  isValidObjectId(nftId)
  isValidObjectId(bidderId)

  const bidValue = Number(bidAmount)

  const bidData = {
    bidderId,
    nftId,
    bidValue,
  }

  const response = await nftService.acceptBid(bidData, req.user)
  return res.status(200).send(response)
})

export const likeNFT = tryCatch(async (req: Request, res: Response) => {
  const { nftId } = req.params
  isValidObjectId(nftId)

  const response = await nftService.likeNFT(req.user._id, nftId, req.user)

  return res.status(200).send(response)
})

export const getTransactions = tryCatch(async (req: Request, res: Response) => {
  const response = await nftService.getTransactions(req.paginationInfo)
  const result = {
    response,
    ...req.paginationInfo,
  }

  return res.status(200).send(result)
})
