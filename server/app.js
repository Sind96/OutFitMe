const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/auth.routes");
const clothingItemRouter = require("./routes/clothingItem.routes");
const weatherRouter = require("./routes/weather.routes");
const errorHandler = require("./middleware/error.middleware");
const AppError = require("./utils/AppError");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "OutFitMe API is running" });
});

app.use(authRouter);
app.use(clothingItemRouter);
app.use(weatherRouter);

app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

app.use(errorHandler);

module.exports = app;
