/* eslint-disable no-unused-vars */
import express from 'express'
// eslint-disable-next-line import/no-extraneous-dependencies
const pinoHttp = require('pino-http')()
import logger from './utils/logger'
import errorHandler from './middleware/errorHandler'
require('./db/mongoose')

// Routes
import userRouter from './routes/user/index'
import contactUsRouter from './routes/contactUsForm/index'
import nftRouter from './routes/NFT/index'
import blogRouter from './routes/blog/index'
import walletRouter from './routes/wallet/index'

const app = express()
const apiRouter = express.Router()
const PORT = 3000

// app.use(pinoHttp)
app.use(express.json())
app.use('/api', apiRouter)

// Logging request
// app.use((req, res, next) => {
//   logger.info(req, 'Incoming Request')
//   next()
// })

apiRouter.use('/user', userRouter)
apiRouter.use('/nft', nftRouter)
apiRouter.use('/form', contactUsRouter)
apiRouter.use('/blog', blogRouter)
apiRouter.use('/wallet', walletRouter)

// Logging resposne

app.use('*', (req, res) => res.send('404! URL Not Found.'))
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`))
