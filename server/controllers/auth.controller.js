const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
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
  } catch (err) {
    console.error("register error:", err);

    return res.status(500).json({
      message: "Registration failed",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET);

    const { password: hashedPassword, ...userData } = user._doc;

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      user: userData,
    });
  } catch (err) {
    console.error("login error:", err);

    return res.status(500).json({
      message: "Login failed",
    });
  }
};

exports.profile = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { password: hashedPassword, ...userData } = user._doc;

    return res.status(200).json({
      message: "Profile retrieved successfully",
      user: userData,
    });
  } catch (err) {
    console.error("profile error:", err);

    return res.status(500).json({
      message: "Error retrieving profile",
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const { id: userId } = req.params;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile deleted successfully",
    });
  } catch (err) {
    console.error("deleteProfile error:", err);

    return res.status(500).json({
      message: "Error deleting profile",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("updateProfile error:", err);

    return res.status(500).json({
      message: "Error updating profile",
    });
  }
};

exports.getFavorites = async (req, res) => {
  return res.status(501).json({
    message: "Get favourites has not been implemented yet",
  });
};

exports.addFavorite = async (req, res) => {
  return res.status(501).json({
    message: "Add favourite has not been implemented yet",
  });
};

exports.removeFavorite = async (req, res) => {
  return res.status(501).json({
    message: "Remove favourite has not been implemented yet",
  });
};

exports.logout = async (req, res) => {
  return res.status(200).json({
    message: "Logout successful",
    accessToken: null,
  });
};
