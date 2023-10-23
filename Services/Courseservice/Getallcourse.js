const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
let Course = require("../../Schema/Course");
module.exports = GetCourse = CatchAsyncerror(async (req, res, next) => {
  let keyword = req.query.keyword || "";
  let category = req.query.category || "";
  let finder = await Course.find({
    title: { $regex: keyword, $options: "i" },
    category: { $regex: category, $options: "i" },
  });
  if (!finder) {
    return next();
  }
  res.status(200).json({
    status: true,
    finder,
  });
});
