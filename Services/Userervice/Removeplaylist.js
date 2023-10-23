const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
let User = require("../../Schema/User");
let Course = require("../../Schema/Course");
module.exports = Removetoplaylist = CatchAsyncerror(async (req, res, next) => {
  let user = await User.findById(req.user);

  let course = await Course.findById(req.body.id);
  if (!course) {
    return res.send("course not find");
  }

  let newplaylist = user.playlist.filter((item) => {
    if (item.course.toString() !== course._id.toString()) {
      return item;
    }
  });
  user.playlist = newplaylist;
  await user.save();
  res.status(200).json({
    msg: "Remove to playlist",
  });
});
