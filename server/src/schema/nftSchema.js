const Joi = require('joi')

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false })

const nftItemValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().min(1).required(),
  sellingMethod: Joi.string().required(),
  royalties: Joi.string().required(),
  price: Joi.when('sellingMethod', {
    is: 'Fixed price',
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  category: Joi.when('sellingMethod', {
    is: 'Fixed price',
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  size: Joi.when('sellingMethod', {
    is: 'Fixed price',
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  startingDate: Joi.when('sellingMethod', {
    is: 'Time auction',
    then: Joi.date().required(),
    otherwise: Joi.forbidden(),
  }),
  endingDate: Joi.when('sellingMethod', {
    is: 'Time auction',
    then: Joi.date().required(),
    otherwise: Joi.forbidden(),
  }),
  minimumBid: Joi.when('sellingMethod', {
    is: 'Time auction',
    then: Joi.number().required(),
    otherwise: Joi.forbidden(),
  }),
})

exports.validateNft = validator(nftItemValidation)
