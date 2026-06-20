const mongoose = require("mongoose");

const clothingItemSchema = new mongoose.Schema({
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

const ClothingItem = mongoose.model("ClothingItem", clothingItemSchema);

module.exports = ClothingItem;
