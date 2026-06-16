const mongoose = require("mongoose");
const { DB_NAME, DB_PORT, TEST_DB_NAME, NODE_ENV } = process.env;

if (NODE_ENV === "test") {
  mongoose
    .connect(`mongodb://127.0.0.1:${DB_PORT}/${TEST_DB_NAME}`, {})
    .then(() => {
      console.log(
        `🎃 Succesfully connected to ${TEST_DB_NAME} on port ${DB_PORT}!`,
      );
    })
    .catch((error) => {
      console.log(`Something went wrong! ${error}`);
    });
} else {
  mongoose
    .connect(`mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`, {})
    .then(() => {
      console.log(`🎃 Succesfully connected to ${DB_NAME} on port ${DB_PORT}!`);
    })
    .catch((error) => {
      console.log(`Something went wrong! ${error}`);
    });
}
module.exports = mongoose;
