const express = require('express')
const errorHandler = require('./middleware/errorHandler')
require('./db/mongoose')

// Routes
const userRouter = require('./routes/user/index')
const nftRouter = require('./routes/NFT/index')

const app = express()
const PORT = 3000

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/nft', nftRouter)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`))
