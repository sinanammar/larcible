import { Request, Response } from 'express'
import AppError from '../../AppError'
import { tryCatch } from '../../utils/tryCatch'
import isValidObjectId from '../../utils/isValidObjectId'

import blogService from '../../services/blogService'

import { validateBlogArticle } from '../../schema/blogSchema'
import { validateComment } from '../../schema/commentSchema'

export const publishArticle = tryCatch(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError('Unauthorized: No user found', 401)

  const { error } = validateBlogArticle(req.body)
  if (error) {
    throw new Error(error)
  }

  const resposne = await blogService.publishArticle(req.body, req.user._id)
  return res.status(200).send(resposne)
})

export const deleteArticle = tryCatch(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError('Unauthorized: No user found', 401)

  const articleId = req.params.id
  isValidObjectId(articleId)

  await blogService.deleteArticle(articleId, req.user._id)
  return res.status(200).send({ message: 'Article deleted successfully' })
})

export const addComment = tryCatch(async (req: Request, res: Response) => {
  const { articleId } = req.params
  isValidObjectId(articleId)

  const { error } = validateComment(req.body)
  if (error) {
    throw new Error(error)
  }

  const commentData = {
    content: req.body.comment,
    user: req.user._id,
    articleId,
  }

  const response = await blogService.addComment(commentData)
  return res.status(201).send(response)
})

export const addCommentReply = tryCatch(async (req: Request, res: Response) => {
  const { articleId, commentId } = req.params
  isValidObjectId(articleId)
  isValidObjectId(commentId)

  const { error } = validateComment(req.body)
  if (error) {
    throw new Error(error)
  }

  const commentData = {
    content: req.body.comment,
    user: req.user._id,
    commentId,
    articleId,
  }

  const response = await blogService.addCommentReply(commentData)
  return res.status(201).send(response)
})

export const getArticles = tryCatch(async (req: Request, res: Response) => {
  const response = await blogService.getArticles(req.paginationInfo)
  const results = {
    response,
    ...req.paginationInfo,
  }
  return res.status(201).send(results)
})

export const getArticle = tryCatch(async (req: Request, res: Response) => {
  const response = await blogService.getArticle(req.params.articleId)
  return res.status(200).send(response)
})

export const deleteComment = tryCatch(async (req: Request, res: Response) => {
  const { articleId, commentId } = req.params
  isValidObjectId(articleId)
  isValidObjectId(commentId)

  await blogService.deleteComment(articleId, commentId)
  return res.status(204).send()
})

export const deleteCommentReply = tryCatch(async (req: Request, res: Response) => {
  const { replyId, commentId, articleId } = req.params
  const commentData = {
    replyId,
    commentId,
    articleId,
  }

  isValidObjectId(articleId)
  isValidObjectId(commentId)
  isValidObjectId(replyId)

  await blogService.deleteCommentReply(commentData)
  return res.status(204).send()
})

// export const name = tryCatch(async  (req: Request, res: Response) => {
//   const response = await blogService
//   return res.status(201).send(response)
// })
