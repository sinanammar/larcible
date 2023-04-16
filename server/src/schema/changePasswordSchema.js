const Joi = require('joi')

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false })

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().min(3).max(20).required(),
  newPassword: Joi.string().min(3).max(20).required(),
})

exports.validateChangePassword = validator(changePasswordSchema)
