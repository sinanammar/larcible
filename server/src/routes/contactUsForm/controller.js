const { tryCatch } = require('../../utils/tryCatch')
const { validateForm } = require('../../schema/contactFormSchema')
const formService = require('../../services/formService')

module.exports.submitFormData = tryCatch(async (req, res) => {
  const { error } = validateForm(req.body)
  if (error) throw new Error(error)
  await formService.submitFormData(req.body)
  return res.status(200).send({ message: 'Message sent successfully' })
})
