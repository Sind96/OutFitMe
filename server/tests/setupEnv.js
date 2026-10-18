require("dotenv").config();

process.env.JWT_SECRET = "test-only-jwt-secret-not-for-production";
process.env.NODE_ENV = "test";

if (!process.env.MONGO_TEST_URI) {
  throw new Error("MONGO_TEST_URI must be configured for tests");
}

if (process.env.MONGO_TEST_URI === process.env.MONGO_URI) {
  throw new Error("Test and development MongoDB URIs must be different");
}
