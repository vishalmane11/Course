let mongo = require("mongoose");

let connect = async () => {
  await mongo
    .connect(process.env.MONGO_URI)
    .then((res) => {
      console.log("mongo start");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connect;
