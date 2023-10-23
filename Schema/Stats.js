let mongo = require("mongoose");
let validator = require("validator");
let schema = new mongo.Schema({
  users: {
    type: Number,
    default: 0,
  },
  subscribes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
let models = new mongo.model("Stats", schema);
module.exports = models;
