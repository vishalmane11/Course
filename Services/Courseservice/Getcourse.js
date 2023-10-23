const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
let Course = require("../../Schema/Course");
module.exports = Getcourse = CatchAsyncerror(async (req, res, next) => {
  let find = await Course.findById(req.params.id);
  if (!find) {
    return res.send("error");
  }
  find.views += 1;
  res.status(200).json({
    sucess: true,
    lectures: find.lectures,
  });
});
