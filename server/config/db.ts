import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
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

export default connectDB;
