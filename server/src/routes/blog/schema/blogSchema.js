const Joi = require('joi')

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false })

const blogArticleValidation = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().min(10).required(),
  categories: Joi.array().min(1).required(),
  readingDuration: Joi.number().required(),
})

exports.validateBlogArticle = validator(blogArticleValidation)
