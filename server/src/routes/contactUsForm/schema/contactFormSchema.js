const Joi = require('joi')

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false })

const contactUsFormSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  // phoneNumber: Joi.string().min(3).max(20),
  message: Joi.string().min(1).max(400).required(),
})

exports.validateForm = validator(contactUsFormSchema)
