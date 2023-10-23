let jwt = require("jsonwebtoken");
// let secreate = "terasdsd2";
class token {
  static jwt(id) {
    return jwt.sign({ id }, process.env.SECREATE, { expiresIn: "1h" });
  }
  static verify(token) {
    return jwt.verify(token, process.env.SECREATE);
  }
}
module.exports = token;
