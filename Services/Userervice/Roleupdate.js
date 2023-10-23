let User = require("../../Schema/User");
module.exports = Roleupdate = async (req, res, next) => {
  let { id } = req.params;
  let user = await User.findById({ _id: id });

  if (user.role === "user") {
    user.role = "admin";
  } else user.role = "user";
  await user.save();
  res.status(200).json({
    msg: "role change",
  });
};
