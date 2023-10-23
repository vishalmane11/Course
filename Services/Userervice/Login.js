let User = require("../../Schema/User");
let token = require("../../Middleware/Token");
let bcrypt = require("bcrypt");

let sendtoken = require("../../Middleware/Sendtoken");
module.exports = login = async (req, res, next) => {
  let { email, password } = req.body;
  if (!email && !password) {
    return next(err);
  }
  let finder = await User.findOne({ email }).select("+password");
  if (!finder) {
    return next(err);
  }

  let pass = await bcrypt.compare(password, finder.password);

  if (!pass) {
    return next(err);
  }

  let key = await token.jwt(finder._id, "vishlmane");
  sendtoken(finder, key, res);
};
