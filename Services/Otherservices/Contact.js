const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
let sendEmail = require("../../Utils/Sendemail");
module.exports = contact = CatchAsyncerror(async (req, res, next) => {
  let { name, email, message } = req.body;
  console.log(name);
  if (!name || !email || !message) {
    return res.status(404).json({
      msg: "Fill info",
    });
  }
  let to = process.env.MY_EMAIL;
  let subject = " This message from course";
  let text = ` I am ${name} and my email ${email}${message}`;
  await sendEmail(to, subject, text);
  res.status(200).json({
    msg: "mail send",
  });
});
