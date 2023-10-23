const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
let User = require("../../Schema/User");
let Course = require("../../Schema/Course");
module.exports = Addtoplaylist = CatchAsyncerror(async (req, res, next) => {
  let user = await User.findById(req.user);
  console.log(user);
  let course = await Course.findById(req.body.id);
  if (!course) {
    return res.send("course not find");
  }
  let exist = user.playlist.find((item) => {
    if (item.course.toString() === course._id.toString()) {
      return true;
    }
  });
  if (exist) {
    res.status(409).json({
      msg: "course exist already ",
    });
  }
  user.playlist.push({
    course: course._id,
    poster: course.poster.url,
  });
  await user.save();
  res.status(200).json({
    msg: "Added to playlist",
  });
});
