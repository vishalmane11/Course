let User = require("../../Schema/User");
let cloudinary = require("cloudinary");
module.exports = Deleteprofile = async (req, res, next) => {
  let user = await User.findById({ _id: req.user });
  if (!user) {
    return res.json({
      msg: "user not found",
    });
  }
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  await user.deleteOne({ _id: user });
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      msg: "deleted profile",
    });
};
