let express = require("express");
let Router = express.Router();
let Getvalue = require("../Services/Userervice/Getvalue");
let Buysubscribe = require("../Services/Paymentservice/Subscribe");
const Authenticated = require("../Middleware/Authenticated");
const Paymentverify = require("../Services/Paymentservice/Paymentverify");
const Razorpaykey = require("../Services/Paymentservice/Razorpaykey");
let cancelsubscribe = require("../Services/Paymentservice/Cancelsubscribe");
Router.get("/subscribe", Authenticated, Buysubscribe);
Router.post("/paymentverify", Authenticated, Paymentverify);
Router.get("/paymentkey", Razorpaykey);
Router.delete("/cancelsubscribe", Authenticated, cancelsubscribe);

module.exports = Router;
