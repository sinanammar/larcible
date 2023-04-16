/* eslint-disable no-unused-vars */
const express = require('express')
// eslint-disable-next-line import/no-extraneous-dependencies
const pinoHttp = require('pino-http')()
const logger = require('./utils/logger')
const errorHandler = require('./middleware/errorHandler')
require('./db/mongoose')

// Routes
const userRouter = require('./routes/user/index')
const contactUsRouter = require('./routes/contactUsForm/index')
const nftRouter = require('./routes/NFT/index')
const blogRouter = require('./routes/blog/index')

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

// Logging resposne

app.use('*', (req, res) => res.send('404! URL Not Found.'))
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`))
