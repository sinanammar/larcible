import mongoose from 'mongoose'

const contactUsSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      match: /^\S+@\S+\.\S+$/,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const ContactUs = mongoose.model('ContactUs', contactUsSchema)

export default ContactUs
