const express = require('express')
const errorHandler = require('./middleware/errorHandler')
require('./db/mongoose')

// Routes
const userRouter = require('./routes/user/index')
const nftRouter = require('./routes/NFT/index')

const contactUsRouter = require('./routes/contactUsForm/index')
const blogRouter = require('./routes/blog/index')

const app = express()
const PORT = 3000

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/nft', nftRouter)
app.use('/api/form', contactUsRouter)
app.use('/api/blog', blogRouter)

app.use('*', (req, res) => res.send('404! URL Not Found.'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`))

// Blog
// Writer card with pp, name, and brief bio
// recent posts for writer
// Model -> categories, date, reading duration, creator, thumbNail photo
//          comments,
