const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imgURL: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  item: {
    type: String,
    lowercase: true,
    required: true,
  },
  tempRange: {
    type: [String],
    default: undefined,
    required: true,
  },
  rain: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
