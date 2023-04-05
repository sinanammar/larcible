const Joi = require('joi')

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false })

const commentSchema = Joi.object({
  comment: Joi.string().min(1).required(),
})

exports.validateComment = validator(commentSchema)
