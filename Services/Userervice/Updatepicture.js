const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
let Cloud = require("cloudinary");
let Geturi = require("../../Utils/Datauri");
let User = require("../../Schema/User");
module.exports = updatepicture = CatchAsyncerror(async (req, res, next) => {
  let fileuri = Geturi(req.file);
  let user = await User.findById({ _id: req.user });
  let cloud = await Cloud.v2.uploader.upload(fileuri.content);
  await Cloud.v2.uploader.destroy(user.avatar.public_id);
  user.avatar = {
    public_id: cloud.public_id,
    url: cloud.secure_url,
  };
  res.status(200).json({
    msh: "update sucess",
  });
});
