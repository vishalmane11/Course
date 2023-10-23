let express = require("express");
const UserRouter = require("./Controllers/User");
const CourseRouter = require("./Controllers/Course");
let body = require("body-parser");
let parser = require("cookie-parser");
let app = express();
let mongo = require("./Config/Mongo");
let dotenv = require("dotenv");
let cloudinary = require("cloudinary");
let Razorpay = require("razorpay");
let Payment = require("./Controllers/Payment");
let Other = require("./Controllers/Other");
const Errorhandler = require("./Middleware/Errorhandler");
let nodecron = require("node-cron");
let Stats = require("./Schema/Stats");
dotenv.config({ path: "./.env" });

cloudinary.v2.config({
  cloud_name: "dfhrsxtwk",
  api_key: "198262614114128",
  api_secret: "nocx3FirKjqfKHphOmmGx88qffg",
});

app.use(parser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(body.urlencoded({ extended: true }));
app.use(body.json());
app.use(UserRouter);
app.use(CourseRouter);
app.use(Payment);
app.use(Other);
mongo();

app.use(Errorhandler);
nodecron.schedule("0 0 0 1 * *", async () => {
  try {
    await Stats.create();
  } catch (err) {
    console.log(err);
  }
});
let temp = async () => {
  await Stats.create({});
};
temp();
// module.exports = instance = new Razorpay({
//   key_id: process.env.RAZORPAY_API_KEY,
//   key_secret: process.env.RAZORPAY_API_SECREATE,
// });
app.listen(process.env.SERVER, (req, res) => {
  console.log("server start");
});
