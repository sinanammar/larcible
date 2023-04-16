const pino = require('pino')
const fs = require('fs')

const logger = pino(
  {
    level: 'info',
    options: {
      ignore: 'pid,hostname',
    },
  },
  fs.createWriteStream('app.log'),
)

module.exports = logger
