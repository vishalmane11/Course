let User = require("../../Schema/User");
module.exports = Getmyprofile = async (req, res, next) => {
  let user = await User.findById(req.user);
  if (!user) {
    return res.send("user not found");
  }
  res.status(200).json({
    user,
  });
};
