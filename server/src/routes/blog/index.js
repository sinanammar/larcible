const express = require('express')
const { authUser } = require('../../middleware/authUser')
const { publishArticle, deleteArticle } = require('./controllers')
const articlesRouter = require('./articles')

const router = express.Router()
router.use(authUser)

router.post('/publish-article', publishArticle)
router.delete('/delete/:id', deleteArticle)
router.use('/articles', articlesRouter)

module.exports = router
