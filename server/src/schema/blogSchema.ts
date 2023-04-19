import Joi from 'joi'

interface IBlog {
  title: string
  body: string
  categories: string[]
  readingDuration: number
}

const validator = (schema: any) => (payload: IBlog) => schema.validate(payload)

const blogArticleValidation = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().min(10).required(),
  categories: Joi.array().min(1).required(),
  readingDuration: Joi.number().required(),
})

export const validateBlogArticle = validator(blogArticleValidation)
