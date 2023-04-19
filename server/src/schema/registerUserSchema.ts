import Joi from 'joi'

const validator = (schema: any) => (payload: string) =>
  schema.validate(payload, { abortEarly: false })

const signupSchema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(15).required(),
  password: Joi.string().min(3).max(20).required(),
  confirmPassword: Joi.ref('password'),
  email: Joi.string().email().required(),
})

export const validateSignup = validator(signupSchema)
