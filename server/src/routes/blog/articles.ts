import express from 'express'
import BlogArticle from '../../models/BlogArticle'
import paginate from '../../middleware/paginate'

import {
  addComment,
  addCommentReply,
  getArticles,
  getArticle,
  deleteComment,
  deleteCommentReply,
} from './controllers'

const router = express.Router()

router.get('/', paginate(BlogArticle), getArticles)
router.get('/:articleId', getArticle)
router.post('/:articleId/comments', addComment)
router.post('/:articleId/comments/:commentId/replies', addCommentReply)
router.delete('/:articleId/comments/:commentId', deleteComment)
router.delete('/:articleId/comments/:commentId/reply/:replyId', deleteCommentReply)

export default router
