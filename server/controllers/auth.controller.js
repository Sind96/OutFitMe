const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

exports.register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new AppError("Username or email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const accessToken = jwt.sign({ userId: newUser._id }, JWT_SECRET);

  return res.status(201).json({
    message: "User created successfully",
    accessToken,
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET);

  const { password: hashedPassword, ...userData } = user._doc;

  return res.status(200).json({
    message: "Login successful",
    accessToken,
    user: userData,
  });
});

exports.profile = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const { password: hashedPassword, ...userData } = user._doc;

  return res.status(200).json({
    message: "Profile retrieved successfully",
    user: userData,
  });
});

exports.deleteProfile = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new AppError("User not found", 404);
  }

  return res.status(200).json({
    message: "Profile deleted successfully",
  });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;
  const updates = req.body;

  const updatedUser = await User.findByIdAndUpdate(userId, updates, {
    new: true,
  }).select("-password");

  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }

  return res.status(200).json({
    message: "Profile updated successfully",
    user: updatedUser,
  });
});

exports.getFavourites = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("favouriteOutfits");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return res.status(200).json(user.favouriteOutfits);
});

exports.addFavourite = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { top, bottom, shoe } = req.body;

  const user = await User.findById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const outfitAlreadySaved = user.favouriteOutfits.some(
    (outfit) =>
      outfit.top === top && outfit.bottom === bottom && outfit.shoe === shoe,
  );

  if (outfitAlreadySaved) {
    throw new AppError("This outfit is already saved", 409);
  }

  user.favouriteOutfits.push({
    top,
    bottom,
    shoe,
  });

  await user.save();

  res.status(200).json(user.favouriteOutfits);
});

exports.removeFavourite = asyncHandler(async (req, res) => {
  const { userId, favouriteId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const originalLength = user.favouriteOutfits.length;

  user.favouriteOutfits = user.favouriteOutfits.filter(
    (outfit) => outfit._id.toString() !== favouriteId,
  );

  if (user.favouriteOutfits.length === originalLength) {
    throw new AppError("Favourite outfit not found", 404);
  }

  await user.save();

  return res.status(200).json({
    message: "Favourite outfit removed successfully",
    favouriteOutfits: user.favouriteOutfits,
  });
});

exports.logout = (req, res) => {
  return res.status(200).json({
    message: "Logout successful",
    accessToken: null,
  });
};
