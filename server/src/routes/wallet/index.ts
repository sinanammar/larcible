import express from 'express'
import authUser from '../../middleware/authUser'

import { getWallet, connectWallet, deleteWallet } from './controller'

const router = express.Router()

router.get('/', authUser, getWallet)
router.post('/connect', authUser, connectWallet)
router.delete('/delete', authUser, deleteWallet)

export default router
