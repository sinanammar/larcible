import express from 'express'
import authUser from '../../middleware/authUser'
import { publishArticle, deleteArticle } from './controllers'
import articlesRouter from './articles'

const router = express.Router()
router.use(authUser)

router.post('/publish-article', publishArticle)
router.delete('/delete/:id', deleteArticle)
router.use('/articles', articlesRouter)

export default router
