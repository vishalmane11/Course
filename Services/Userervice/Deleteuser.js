let User = require("../../Schema/User");
let cloudinary = require("cloudinary");
module.exports = Deleteuser = async (req, res, next) => {
  let { id } = req.params;
  let user = await User.findById({ _id: id });
  if (!user) {
    return res.json({
      msg: "user not found",
    });
  }
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  await user.deleteOne({ _id: id });
  res.status(200).json({
    msg: "deleted user",
  });
};
