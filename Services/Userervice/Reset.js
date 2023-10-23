const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
let crypto = require("crypto");
let bcrypt = require("bcrypt");
let User = require("../../Schema/User");
module.exports = Reset = CatchAsyncerror(async (req, res, next) => {
  let { token } = req.params;
  let { password } = req.body;
  if (!token || !password) {
    return next("token not send");
  }
  let ResetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  let user = await User.findOne({
    ResetPasswordToken,
    ResetPasswordExpire: {
      $gt: Date.now(),
    },
  });
  if (!user) {
    return res.send("eror");
  }
  let hash = await bcrypt.hash(password, 10);
  user.password = hash;
  user.ResetPasswordToken = undefined;
  user.ResetPasswordExpire = undefined;
  await user.save();
  res.status(200).json({
    msg: "password change sucess",
  });
});
