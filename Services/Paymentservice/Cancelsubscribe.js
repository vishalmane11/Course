const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
let User = require("../../Schema/User");
let Razorpay = require("razorpay");
module.exports = Cancelsubscibe = CatchAsyncerror(async (req, res, next) => {
  let instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECREATE,
  });
  let user = await User.findById({ _id: req.user });
  let subscibeid = user.subscription.id;
  let refund = false;
  await instance.subscriptions.cancel(subscibeid);
  let payment = await Payment.findOne({
    razorpay_subscription_id: subscibeid,
  });
  let gap = Date.now() - payment.createdAt;
  let refundays = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;
  if (refundays > gap) {
    await instance.payments.refund(payment.razorpay_payment_id);
    refund = true;
  }
  await payment.remove();
  user.subscription.id = undefined;
  user.subscription.status = undefined;
  await user.save();
});
