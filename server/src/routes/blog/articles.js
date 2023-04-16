const express = require('express')

const {
  addComment,
  addCommentReply,
  getArticles,
  getArticle,
  deleteComment,
  deleteCommentReply,
} = require('./controllers')
// const commentsRouter = require('./comments')
// router.use('/comments', commentsRouter)

const router = express.Router()

router.get('/', getArticles)
router.get('/:articleId', getArticle)
router.post('/:articleId/comments', addComment)
router.post('/:articleId/comments/:commentId/replies', addCommentReply)
router.delete('/:articleId/comments/:commentId', deleteComment)
router.delete('/:articleId/comments/:commentId/reply/:replyId', deleteCommentReply)

module.exports = router
