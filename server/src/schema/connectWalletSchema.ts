import Joi from 'joi'

const validator = (schema: any) => (payload: string) =>
  schema.validate(payload, { abortEarly: false })

const walletSchema = Joi.object({
  type: Joi.string().min(3).required(),
  coin: Joi.string().min(2).required(),
})

export const validateWallet = validator(walletSchema)
