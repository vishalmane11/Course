let nodemailer = require("nodemailer");
module.exports = sendemail = async (to, subject, text) => {
  console.log(to, subject, text, "with");
  var transport = nodemailer.createTransport({
    host: process.env.MAILHOST,
    port: process.env.MAILPORT,
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPASSWORD,
    },
  });
  const info = await transport.sendMail({
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
  });
};
