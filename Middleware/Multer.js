let multer = require("multer");

let storage = multer.memoryStorage();
let singleupload = multer({ storage }).single("file");
module.exports = singleupload;
