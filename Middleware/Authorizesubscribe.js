let User = require("../Schema/User");
const CatchAsyncerror = require("./CatchAsyncerror");
module.exports = Authorizeadubscibe = CatchAsyncerror(
  async (req, res, next) => {
    // console.log(req.user);
    let user = await User.findById({ _id: req.user });
    console.log(user, "user");

    if (user.subscription.status !== "active" && user.role !== "admin") {
      return res.status(404).json({
        msg: "admin not subscibe",
      });
    }
    next();
  }
);
