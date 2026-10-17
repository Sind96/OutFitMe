const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri =
    process.env.NODE_ENV === "test"
      ? process.env.MONGO_TEST_URI
      : process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MongoDB connection string is missing");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected successfully");
};

module.exports = connectDB;
