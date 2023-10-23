let mongo = require("mongoose");

let schema = new mongo.Schema({
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_subscription_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
new mongo.model("Payment", schema);
module.exports = model;
