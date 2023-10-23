const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
const Errorhandler = require("../../Middleware/Errorhandler");
let User = require("../../Schema/User");
let bcrypt = require("bcrypt");
module.exports = changepassword = CatchAsyncerror(async (req, res, next) => {
  let { oldpassword, newpassword } = req.body;
  if (!oldpassword && !newpassword) {
    return res.send("wrong");
  }
  let user = await User.findById(req.user).select("+password");

  if (!user) {
    return res.send("wrong");
  }

  let compare = await bcrypt.compare(oldpassword, user.password);
  console.log(compare);

  if (!compare) {
    return res.send("wrong");
  }
  let hashed = await bcrypt.hash(newpassword, 10);
  user.password = hashed;
  let saver = user.save();
  res.status(200).json({
    sucess: true,
    user,
  });
});
