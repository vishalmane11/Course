let jwt = require("../Middleware/Token");
module.exports = auth = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return res.send("token not get");
  }

  let verify = await jwt.verify(token);
  if (!verify) {
    return res.send("token not expired");
  }

  req.user = verify.id;
  console.log(req.user);
  next();
};
