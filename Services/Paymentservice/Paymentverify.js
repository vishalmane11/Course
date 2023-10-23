const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
let User = require("../../Schema/User");
let crypto = require("crypto");
module.exports = Paymentverify = CatchAsyncerror(async (req, res, next) => {
  let { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  let user = await User.findById(req.user);
  if (user.role === "admin") {
    return res.status(404).json({
      msg: "You are admin",
    });
  }
  let subscription_id = user.subscription.id;
  let signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECREATE)
    .update(RAZORPAY_API_KEY + "|" + subscription_id, "utf-8")
    .digest("hex");
  let auth = signature === razorpay_signature;
  if (!auth) {
    return res.redirect(`${process.env.FRONTEND_URL}/paymentfailed`);
  }
  await Payment.create({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  });
  user.subscription.status = "active";
  await user.save();
  res.redirect(
    `${process.env.FRONTEND_URL}/paymentsucess?reference=${razorpay_payment_id}`
  );
});
