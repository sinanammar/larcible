import multer from 'multer'
import AppError from '../AppError'

export const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'avatars')
    },
    filename(req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`)
    },
  }),
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
