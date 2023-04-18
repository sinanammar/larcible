const Joi = require('joi')

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false })

const BidSchema = Joi.object({
  bidValue: Joi.string().max(200).required(),
})

exports.validateBid = validator(BidSchema)
