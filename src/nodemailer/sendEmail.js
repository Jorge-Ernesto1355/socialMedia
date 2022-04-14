const transporter = require('./Mailer')

const SendEmail =  async (titulo, correo, subject, text, html)=>{

    await transporter.sendMail({
    from: titulo, // sender address
    to: correo, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html// html body

    })
  }

module.exports = SendEmail