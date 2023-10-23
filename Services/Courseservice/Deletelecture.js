const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
let Course = require("../../Schema/Course");
let cloudinary = require("cloudinary");
module.exports = Deletelecture = CatchAsyncerror(async (req, res, next) => {
  const { courseId, lectureId } = req.query;

  const course = await Course.findById({ _id: courseId });

  if (!course) {
    return res.send("error occour");
  }

  let lecture = course.lectures.find((item) => {
    if (item._id.toString() === lectureId.toString()) return item;
  });

  await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
    resource_type: "video",
  });
  course.lectures = course.lectures.filter((item) => {
    if (item._id.toString() !== lectureId.toString()) return item;
  });
  course.Numberofvideos = course.Numberofvideos.length;
  await course.save();
  res.status(404).json({
    msg: "lecture deleted",
  });
});
