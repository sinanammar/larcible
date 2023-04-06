const AppError = require('../../AppError')
const blogService = require('../../services/blogService')
const isValidObjectId = require('../../utils/isValidObjectId')
const { tryCatch } = require('../../utils/tryCatch')

const { validateBlogArticle } = require('./schema/blogSchema')
const { validateComment } = require('./schema/commentSchema')

module.exports.publishArticle = tryCatch(async (req, res) => {
  if (!req.user) throw new AppError('Unauthorized: No user found', 401)

  const { error } = validateBlogArticle(req.body)
  if (error) throw new Error(error)

  const resposne = await blogService.publishArticle(req.body, req.user._id)
  return res.status(200).send(resposne)
})

module.exports.deleteArticle = tryCatch(async (req, res) => {
  if (!req.user) throw new AppError('Unauthorized: No user found', 401)

  const articleId = req.params.id
  isValidObjectId(articleId)

  await blogService.deleteArticle(articleId, req.user._id)
  return res.status(200).send({ message: 'Article deleted successfully' })
})

module.exports.addComment = tryCatch(async (req, res) => {
  const {articleId} = req.params
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

module.exports.addCommentReply = tryCatch(async (req, res) => {
  const {articleId} = req.params
  const {commentId} = req.params
  // isValidObjectId(articleId)
  // isValidObjectId(commentId)

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

module.exports.getArticles = tryCatch(async (req, res) => {
  const response = await blogService.getArticles()
  return res.status(201).send(response)
})

module.exports.getArticle = tryCatch(async (req, res) => {
  const response = await blogService.getArticle(req.params.articleId)
  return res.status(201).send(response)
})

// module.exports.name = tryCatch(async (req, res) => {
//   const response = await blogService
//   return res.status(201).send(response)
// })
