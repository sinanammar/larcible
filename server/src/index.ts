import express from 'express'
const pinoHttp = require('pino-http')()
import logger from './utils/logger'
import errorHandler from './middleware/errorHandler'
import cors from 'cors'
require('./db/mongoose')

// Routes
import userRouter from './routes/user/index'
import contactUsRouter from './routes/contactUsForm/index'
import nftRouter from './routes/NFT/index'
import blogRouter from './routes/blog/index'
import walletRouter from './routes/wallet/index'

const PORT = 3000
export const app = express()

console.log('HIT!!!')

// app.use(pinoHttp)
app.use(express.json())

app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['POST', 'GET'],
  }),
)
app.use(function (req, res, next) {
  console.log(res.header)
  res.header('Access-Control-Allow-Origin', 'http://localhost')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Accept, Content-Type, Authorization, X-Requested-With',
  )

  next()
})

app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.send({ msg: 'This has CORS enabled' })
})

const apiRouter = express.Router()

app.use('/api', apiRouter)
apiRouter.use('/user', userRouter)

apiRouter.use('/nft', nftRouter)
apiRouter.use('/form', contactUsRouter)
apiRouter.use('/blog', blogRouter)
apiRouter.use('/wallet', walletRouter)

app.use('*', (req, res) => res.send('404! URL Not Found.'))
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`))

// Logging request
// app.use((req, res, next) => {
//   logger.info(req, 'Incoming Request')
//   next()
// })
