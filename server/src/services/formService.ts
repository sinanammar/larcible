import ContactUs from '../models/contactUs'
import { IForm } from '../types/formInterface'

const submitFormData = async (formData: IForm) => {
  const newMessage = new ContactUs(formData)
  const message = await newMessage.save()

  return message
}

export default { submitFormData }
