let User = require("../../Schema/User");
let crypto = require("crypto");
let sendemail = require("../../Utils/Sendemail");
module.exports = reset = async (req, res, next) => {
  let { email } = req.body;
  let find = await User.findOne({ email: email });
  if (!find) {
    return next(err);
  }
  //   to get token
  let token = crypto.randomBytes(20).toString("hex");
  find.ResetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  find.ResetPasswordExpire = Date.now() + 15 * 60 * 1000;
  await find.save();
  let url = `${process.env.URL}/resetpassword/${token}`;
  let message = `click on this link reset password ${url}`;
  await sendemail(find.email, "resetpassword", message);
  res.send("plz check email");
};
