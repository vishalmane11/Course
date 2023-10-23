// try catch middlware

module.exports = catcherror = (fun) => (req, res, next) => {
  Promise.resolve(fun(req, res, next)).catch(next);
};
