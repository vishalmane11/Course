let express = require("express");
let Router = express.Router();
let contact = require("../Services/Otherservices/Contact");
let courserequest = require("../Services/Otherservices/Courserequest");
let getDashboard = require("../Services/Otherservices/GetDashboard");
let Auth = require("../Middleware/Authenticated");
let Admin = require("../Middleware/Admin");
Router.post("/contact", contact);
Router.post("/courserequest", courserequest);
Router.get("/admin/stats", Auth, Admin, getDashboard);

module.exports = Router;
