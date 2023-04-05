const express = require('express')
const { authUser } = require('../../middleware/authUser')
const { submitFormData } = require('./controller')

const router = express.Router()

router.post('/contact-us-', submitFormData)

module.exports = router
