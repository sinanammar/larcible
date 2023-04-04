const nodemailer = require('nodemailer')

const sendWelcomeEmail = async () => {
  let testAccount = await nodemailer.createTestAccount()

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  let info = await transporter.sendMail({
    from: testAccount.user,
    to: 'email.com',
    subject: 'Hello ✔',
    text: 'Hello?',
    html: '<b>Hello</b>',
  })

  console.log('Message sent: %s', info.messageId)

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}

module.exports = sendWelcomeEmail
