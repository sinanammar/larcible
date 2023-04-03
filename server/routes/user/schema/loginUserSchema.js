const Joi = require('joi')

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false })

const loginSchema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(15).required(),
  password: Joi.string().min(3).max(20).required(),
})

exports.validateLogin = validator(loginSchema)
