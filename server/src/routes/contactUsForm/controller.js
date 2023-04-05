const ContactUs = require('../../models/contactUs')
const { tryCatch } = require('../../utils/tryCatch')
const { validateForm } = require('./schema/contactFormSchema')
const formService = require('../../services/formService')

module.exports.submitFormData = tryCatch(async (formData) => {
  const { error } = validateForm(formData)

  if (error) throw new Error(error)
  const resposne = await formService.submitFormData(formData)

  return res.statua(200).send(resposne)
})
