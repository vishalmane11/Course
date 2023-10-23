module.exports = logout = (req, res, next) => {
  //   let id = req.user;
  //   if (!id) {
  //     return next(customerror.value("first login"));
  //   }
  //   console.log(req.cookies);
  let option = {
    expires: new Date(Date.now() + process.env.COOKIE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.cookie("token", null, option);
  res.status(404).json({
    msg: "logout sucessfully",
  });
};
