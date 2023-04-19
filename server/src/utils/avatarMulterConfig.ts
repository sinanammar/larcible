import multer from 'multer'
import AppError from '../AppError'

export const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new AppError('Please upload an image', 400))
    }

    return cb(null, true)
  },
})