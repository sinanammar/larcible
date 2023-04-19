import Joi from 'joi'

interface IPassword {
  currentPassword: string
  newPassword: string
}

const validator = (schema: any) => (payload: IPassword) =>
  schema.validate(payload, { abortEarly: false })

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().min(3).max(20).required(),
  newPassword: Joi.string().min(3).max(20).required(),
})

export const validateChangePassword = validator(changePasswordSchema)
