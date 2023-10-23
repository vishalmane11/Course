let mongo = require("mongoose");
let validator = require("validator");
let schema = new mongo.Schema({
  title: {
    type: String,
    required: [true, "pz enter title"],
    minLength: [4, "tile must be 4 character"],
    maxLength: [80, "tile must be 80 character"],
  },
  description: {
    type: String,
    required: [true, "pz enter Discription"],
    minLength: [20, "tile must be 4 character"],
  },
  lectures: [
    {
      title: {
        type: String,
        required: [true, "pz enter title"],
      },
      description: {
        type: String,
        required: [true, "pz enter title"],
      },
      video: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    },
  ],
  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  views: {
    type: Number,
    default: 0,
  },
  Numberofvideos: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: [true, "enter course creator name"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
let models = new mongo.model("Course", schema);
module.exports = models;
