import express from 'express'
import { submitFormData } from './controller'

const router = express.Router()

router.post('/contact-us', submitFormData)

export default router

// const express = require('express')
// const { submitFormData } = require('./controller')

// const router = express.Router()

// router.post('/contact-us', submitFormData)

// module.exports = router
