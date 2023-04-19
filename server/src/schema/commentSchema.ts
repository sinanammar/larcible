import Joi from 'joi'

const validator = (schema: any) => (payload: string) =>
  schema.validate(payload, { abortEarly: false })

const commentSchema = Joi.object({
  comment: Joi.string().min(1).required(),
})

export const validateComment = validator(commentSchema)
