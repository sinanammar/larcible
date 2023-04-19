import Joi from 'joi'

interface IContactForm {
  firstname: string
  lastname: string
  email: string
  message: string
}

const validator = (schema: any) => (payload: IContactForm) =>
  schema.validate(payload, { abortEarly: false })

const contactUsFormSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(1).max(400).required(),
})

export const validateForm = validator(contactUsFormSchema)
