const Joi = require('joi')

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false })

const blogArticleValidation = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().min(400).required(),
  categories: Joi.array().min(1).required(),
  creator: Joi.string().required(),
  //   thumbnailPhoto: Joi.buffer().required(),
})

exports.validateBlogArticle = validator(blogArticleValidation)
