const Custom = require("./Customerror");

module.exports = Errorhandle = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  res.status(err.statusCode).json({
    sucess: false,
    msg: err.message,
  });
};
