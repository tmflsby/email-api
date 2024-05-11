const router = require('koa-router')()
const nodemailer = require('nodemailer')

router.prefix('/email')

router.post('/send', async (ctx, next) => {
  const { email, subject, content } = ctx.request.body

  const transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '823246840@qq.com', // generated ethereal user
      pass: 'dceivuxzulwvbebh', // generated ethereal password
    },
  })

  const mailOptions = {
    from: '"小肥羊" <823246840@qq.com>', // sender address
    to: email, // list of receivers
    subject, // Subject line
    // text: content, // plain text body
    html: `<b>${content}</b>`, // html body
  }

  try {
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message sent: %s', info.messageId)
    })

    ctx.body = {
      code: 200,
      data: null,
      msg: '发送成功'
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
