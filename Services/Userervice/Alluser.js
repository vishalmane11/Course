const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
let User = require("../../Schema/User");
module.exports = Alluser = CatchAsyncerror(async (req, res, next) => {
  let user = await User.find();
  if (!user) {
    return res.send("not user");
  }
  res.status(200).json({
    user,
  });
});
