module.exports = Razorkey = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    key: process.env.RAZORPAY_API_KEY,
  });
};
