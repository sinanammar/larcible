import express from 'express'

import BlogArticle from '../../models/BlogArticle'

import paginate from '../../middleware/paginate'
import authUser from '../../middleware/authUser'

import commentsRouter from './comments'
import { getArticles, getArticle } from './controllers'

const router = express.Router()

router.get('/', paginate(BlogArticle), getArticles)
router.get('/:articleId', getArticle)
router.use('/:articleId', authUser, commentsRouter)

export default router
