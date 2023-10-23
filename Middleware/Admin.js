let User = require("../Schema/User");
module.exports = Admin = async (req, res, next) => {
  let user = await User.findById({ _id: req.user });
  console.log(user.role);
  if (user.role === "admin") {
    return next();
  }
  return res.status(404).json({
    msg: "ADmin creditials",
  });
};
