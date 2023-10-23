let mongo = require("mongoose");
let validator = require("validator");
let schema = new mongo.Schema({
  name: { type: String, required: [true, "name is required"] },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    validate: [validator.isEmail, "enter correct"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [6, "password atleast 6 character"],
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  subscription: {
    id: String,
    status: String,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  playlist: [
    {
      course: {
        type: mongo.Schema.Types.ObjectId,
        ref: "Course",
      },
      poster: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  ResetPasswordToken: String,
  ResetPasswordExpire: String,
});
let models = new mongo.model("User", schema);
module.exports = models;
