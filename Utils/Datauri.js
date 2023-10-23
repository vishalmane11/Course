let Daturi = require("datauri/parser.js");
let path = require("path");
let Geturi = (file) => {
  let parser = new Daturi();

  let extname = path.extname(file.originalname).toString();

  return parser.format(extname, file.buffer);
};

module.exports = Geturi;
