import { Request, Response, NextFunction } from 'express'
import { tryCatch } from '../utils/tryCatch'

const paginate = (model: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const pageQ = req.query.pageQ
    const limitQ = req.query.limitQ

    const page = Number(pageQ)
    const limit = Number(limitQ)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {
      startIndex,
      next: {},
      previous: {},
    }

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit,
      }
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      }
    }

    req.paginationInfo = results
    next()
  }
}

export default paginate
