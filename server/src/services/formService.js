const ContactUs = require('../models/contactUs')

module.exports.submitFormData = async (formData) => {
  const newMessage = ContactUs(formData)
  const message = await newMessage.save()

  return message
}
