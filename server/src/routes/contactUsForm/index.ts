import express from 'express'
import { submitFormData } from './controller'

const router = express.Router()

router.post('/contact-us', submitFormData)

export default router
