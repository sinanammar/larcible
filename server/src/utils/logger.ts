import pino, { DestinationStream, LoggerOptions } from 'pino'
import fs from 'fs'

const loggerOptions: LoggerOptions = pino(
  {
    level: 'info',
    options: {
      ignore: 'pid,hostname',
    },
  },
  // fs.createWriteStream('app.log'),
)

const logger = pino(loggerOptions, fs.createWriteStream('app.log'))
export default logger
