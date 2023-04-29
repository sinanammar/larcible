import express from 'express'
import {
  addComment,
  addCommentReply,
  deleteComment,
  deleteCommentReply,
} from './controllers'

const router = express.Router()

router.post('/comments', addComment)
router.delete('/comments/:commentId', deleteComment)
router.post('/comments/:commentId/replies', addCommentReply)
router.delete('/comments/:commentId/reply/:replyId', deleteCommentReply)

export default router
