const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
const Custom = require("../../Middleware/Customerror");
const Errorhandler = require("../../Middleware/Errorhandler");
let Course = require("../../Schema/Course");
let Geturi = require("../../Utils/Datauri");
let Cloud = require("cloudinary");
module.exports = create = CatchAsyncerror(async (req, res, next) => {
  let { title, description, poster, category, createdBy } = req.body;
  let file = req.file;
  if (!title || !description || !category || !createdBy) {
    return next(new Custom(404, "fill all info"));
  }

  let fileuri = await Geturi(file);

  let cloud = await Cloud.v2.uploader.upload(fileuri.content);

  let create = await Course.create({
    title,
    description,
    poster: {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    },
    category,
    createdBy,
  });
  if (!create) {
    return next(new Custom(404, "no create"));
  }
  res.status(200).json({
    create,
    msg: "courrse created",
  });
});
