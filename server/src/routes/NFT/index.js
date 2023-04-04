const express = require('express')
const { authUser } = require('../../middleware/authUser')
const { upload } = require('../../utils/nftMulterConfig')

const router = express.Router()

router.post(
  '/upload/photo',
  authUser,
  upload.single('nft'),
  async (req, res) => {
    res.send(req.file)
  }
)

module.exports = router
