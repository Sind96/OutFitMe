const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri =
    process.env.NODE_ENV === "test"
      ? process.env.MONGO_TEST_URI
      : process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MongoDB connection string is missing");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
