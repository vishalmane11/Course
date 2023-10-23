const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
let User = require("../../Schema/User");
// let instance = require("../../App");
let Razorpay = require("razorpay");
module.exports = Subscribe = CatchAsyncerror(async (req, res, next) => {
  let instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECREATE,
  });
  let user = await User.findById(req.user);
  if (user.role === "admin") {
    return res.status(404).json({
      msg: "You are admin",
    });
  }

  let subscribe = await instance.subscriptions.create({
    plan_id: process.env.PLAN_ID,
    total_count: 12,

    customer_notify: 1,
  });
  user.subscription.id = subscribe.id;
  user.subscription.status = subscribe.status;
  await user.save();
  console.log(subscribe);
  res.status(200).json({
    sucess: true,
    subscribe,
  });
});
