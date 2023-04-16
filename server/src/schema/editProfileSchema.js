const Joi = require('joi')
const AppError = require('../AppError')

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false })

const editProfileSchema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(15),
  email: Joi.string().email(),
})
  .unknown(true)
  .custom((value) => {
    const allowedUpdates = ['firstname', 'email']
    const updates = Object.keys(value)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
      throw new AppError('Invalid updates!', 400)
    }
  })

exports.validateEdit = validator(editProfileSchema)
