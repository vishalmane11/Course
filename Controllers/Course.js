let express = require("express");
let Router = express.Router();
let Getvalue = require("../Services/Courseservice/Getallcourse");
let Createcourse = require("../Services/Courseservice/Createcourse");
const Getcourse = require("../Services/Courseservice/Getcourse");
const Addlecture = require("../Services/Courseservice/Addlectures");
let auth = require("../Middleware/Authenticated");
const singleupload = require("../Middleware/Multer");
const Admin = require("../Middleware/Admin");
const Deletecourse = require("../Services/Courseservice/Deletecourse");
const Deletelecture = require("../Services/Courseservice/Deletelecture");
let subscibe = require("../Middleware/Authorizesubscribe");
const Authenticated = require("../Middleware/Authenticated");
let Course = require("../Schema/Course");
let Stats = require("../Schema/Stats");
Router.get("/getallcourse", Getvalue);
// admin routes

Router.post("/Createcourse", auth, singleupload, Createcourse);
Router.delete("/deletecourse/:id", auth, singleupload, Deletecourse);
// add get course
Router.get("/getcourse/:id", Authenticated, Admin, Getcourse);
// admin routes
Router.post("/addlecture/:id", auth, Admin, singleupload, Addlecture);
Router.delete("/deletelecture", auth, Admin, singleupload, Deletelecture);
Course.watch().on("change", async () => {
  let stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  console.log(stats);
  let course = await Course.find();
  let totlview = 0;
  for (let i = 0; i < course.length; i++) {
    totlview = totlview + course[i].views;
  }
  stats[0].views = totlview;
  stats[0].createdAt = new Date(Date.now());
  await stats[0].save();
});
module.exports = Router;
