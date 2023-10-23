const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
let Course = require("../../Schema/Course");
let cloudinary = require("cloudinary");
module.exports = Deletecourse = CatchAsyncerror(async (req, res, next) => {
  let { id } = req.params;
  let course = await Course.findById(id);

  if (!course) {
    return next("error");
  }
  await cloudinary.v2.uploader.destroy(course.poster.public_id);
  for (let i = 0; i < course.lectures.length; i++) {
    let singlelecture = course.lectures[i];
    await cloudinary.v2.uploader.destroy(singlelecture.video.public_id, {
      resource_type: "video",
    });
  }

  await Course.deleteOne({ _id: course._id });

  res.status(200).json({
    sucess: true,
    msg: "sucess",
  });
});
