const express = require('express')
const { authUser } = require('../../middleware/authUser')
const {
  publishArticle,
  deleteArticle,
  addComment,
  addCommentReply,
  getArticles,
  getArticle,
} = require('./controllers')

const router = express.Router()

router.post('/publish-article', authUser, publishArticle)
router.delete('/delete/:id', authUser, deleteArticle)
router.post('/articles/:articleId/comments', authUser, addComment)
router.post(
  '/articles/:articleId/comments/:commentId/replies',
  authUser,
  addCommentReply
)

router.get('/articles', authUser, getArticles)
router.get('/article/:articleId', authUser, getArticle)

module.exports = router
