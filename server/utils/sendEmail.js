const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (options) => {

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE_PROVIDER,
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASSWORD,
    },
  });


  // send mail with defined transport object
  const message = {
    from: process.env.EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message
  }

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;