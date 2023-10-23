const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
let User = require("../../Schema/User");
let bcrypt = require("bcrypt");
let sendtoken = require("../../Middleware/Sendtoken");
let token = require("../../Middleware/Token");
let Geturi = require("../../Utils/Datauri");
let Cloud = require("cloudinary");
module.exports = Register = CatchAsyncerror(async (req, res, next) => {
  // res.json(create);

  let { name, email, password } = req.body;
  if (!name && !email && !password) {
    return next();
  }
  let fileuri = await Geturi(req.file);

  let cloud = await Cloud.v2.uploader.upload(fileuri.content);

  let hash = await bcrypt.hash(password, 10);

  let user = {
    name: name,
    email: email,
    password: hash,
    avatar: {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    },
  };
  let create = await User.create(user);

  if (!create) {
    return next(err);
  }
  let tokenaccess = await token.jwt(create.id);
  // token,cookies send
  sendtoken(create, tokenaccess, res);
});
