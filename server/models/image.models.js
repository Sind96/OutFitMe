'use strict';

const mongoose = require('../dbconnect');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
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

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
