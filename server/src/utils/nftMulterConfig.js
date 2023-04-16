const multer = require('multer')
const AppError = require('../AppError')

exports.upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'nftImages')
    },
    filename(req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`)
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter(req, file, cb) {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/pdf']

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new AppError(
          'Please upload an image with one of the following forms jpeg, jpg, pdf. Max limit is 10MB',
          400,
        ),
      )
    }
    return cb(null, true)
  },
})
