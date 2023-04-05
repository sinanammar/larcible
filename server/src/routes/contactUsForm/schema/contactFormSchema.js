const Joi = require('joi')

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false })

const signupSchema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(15).required(),
  lastname: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(3).max(20),
  message: Joi.string().min(10).max(400).required(),
})

exports.validateSignup = validator(signupSchema)
