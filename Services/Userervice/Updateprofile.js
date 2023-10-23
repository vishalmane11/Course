const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
let User = require("../../Schema/User");
module.exports = Updateprofile = CatchAsyncerror(async (req, res, next) => {
  let { name, email } = req.body;
  if (!name || !email) {
    return res.status(404).json({
      msg: "fill correct",
    });
  }
  let user = await User.findById(req.user);
  if (!user) {
    return res.status(404).json({
      msg: "user not found",
    });
  }
  user.name = name;
  user.email = email;
  await user.save();
  return res.status(200).json({
    msg: "update sucesss",
    user,
  });
});
