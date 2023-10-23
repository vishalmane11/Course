const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
let sendEmail = require("../../Utils/Sendemail");
module.exports = Request = CatchAsyncerror(async (req, res, next) => {
  let { name, email, course } = req.body;
  if (!name || !email || !course) {
    return res.status(404).json({
      msg: "Fill info",
    });
  }
  let to = process.env.MY_EMAIL;
  let subject = " This message for request course";
  let text = ` I am ${name} and my email ${email}${course}`;
  await sendEmail(to, subject, text);
  res.status(200).json({
    msg: "mail send",
  });
});
