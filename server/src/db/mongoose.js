const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1/larcibledb')

// eslint-disable-next-line no-unused-vars
const db = mongoose.Connection
