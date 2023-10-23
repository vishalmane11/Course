const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
let Course = require("../../Schema/Course");
let Cloud = require("cloudinary");
let Geturi = require("../../Utils/Datauri");
module.exports = Addcourse = CatchAsyncerror(async (req, res, next) => {
  let course = await Course.findById(req.params.id);
  let { title, description } = req.body;
  if (!course) {
    return res.send("error");
  }
  let fileuri = Geturi(req.file);
  // console.log(req.file);
  let cloud = await Cloud.v2.uploader.upload(fileuri.content, {
    resource_type: "video",
  });
  course.lectures.push({
    title,
    description,
    video: {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    },
  });
  course.Numberofvideos = course.lectures.length;
  await course.save();
  res.status(200).json({
    sucess: true,
    lectures: course.lectures,
  });
});
