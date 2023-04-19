import express from 'express'

import {
  addComment,
  addCommentReply,
  getArticles,
  getArticle,
  deleteComment,
  deleteCommentReply,
} from './controllers'

const router = express.Router()

router.get('/', getArticles)
router.get('/:articleId', getArticle)
router.post('/:articleId/comments', addComment)
router.post('/:articleId/comments/:commentId/replies', addCommentReply)
router.delete('/:articleId/comments/:commentId', deleteComment)
router.delete('/:articleId/comments/:commentId/reply/:replyId', deleteCommentReply)

export default router
