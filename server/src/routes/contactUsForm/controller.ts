import { Request, Response } from 'express'
import { tryCatch } from '../../utils/tryCatch'
import { validateForm } from '../../schema/contactFormSchema'
import formService from '../../services/formService'

export const submitFormData = tryCatch(async (req: Request, res: Response) => {
  const { error } = validateForm(req.body)
  if (error) throw new Error(error)
  await formService.submitFormData(req.body)
  return res.status(200).send({ message: 'Message sent successfully' })
})

// const { tryCatch } = require('../../utils/tryCatch')
// const { validateForm } = require('../../schema/contactFormSchema')
// const formService = require('../../services/formService')

// module.exports.submitFormData = tryCatch(async (req, res) => {
//   const { error } = validateForm(req.body)
//   if (error) throw new Error(error)
//   await formService.submitFormData(req.body)
//   return res.status(200).send({ message: 'Message sent successfully' })
// })
