const express = require('express')

const { addComment, addCommentReply } = require('./controllers')

const router = express.Router()

router.post('/', addComment)
router.post('/comments/:commentId/replies', addCommentReply)

module.exports = router
