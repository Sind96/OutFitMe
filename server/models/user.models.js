const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: 'https://iio.azcast.arizona.edu/sites/default/files/profile-blank-whitebg.png',
  },
  favoriteOutfit: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
