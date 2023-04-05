const express = require('express')
const { authUser } = require('../../middleware/authUser')
const { upload } = require('../../utils/nftMulterConfig')
const {
  getAllNfts,
  getNftDetails,
  getTopRankingNfts,
} = require('../NFT/controller')

const router = express.Router()

router.post(
  '/upload/photo',
  authUser,
  upload.single('nft'),
  async (req, res) => {
    res.send(req.file)
  }
)

router.get('/get-all', getAllNfts)
router.post('/details', getNftDetails)
router.get('/top-ranking', getTopRankingNfts)

// router.get('/', async (req, res) => {
//   sdk.auth('b89239e9-f6ca-4b12-a5d7-bdf14fdf7ef3')
//   sdk
//     .retrieveNftDetails({
//       chain: 'ethereum',
//       refresh_metadata: 'false',
//       contract_address: '0x2bd938cf96430b7b0879f76b010b589aeec2127c',
//       token_id: '128690',
//     })
//     .then(({ data }) => res.send(data))
//     .catch((err) => res.send(err))
// })

module.exports = router
