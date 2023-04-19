import Joi from 'joi'

const validator = (schema: any) => (payload: string) =>
  schema.validate(payload, { abortEarly: false })

const BidSchema = Joi.object({
  bidValue: Joi.string().max(200).required(),
})

export const validateBid = validator(BidSchema)
