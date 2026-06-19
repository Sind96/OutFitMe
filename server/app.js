const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/auth.routes");
const clothingItemRouter = require("./routes/clothingItem.routes");
const errorHandler = require("./middleware/error.middleware");
const AppError = require("./utils/AppError");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "OutFitMe API is running" });
});

// Routes
app.use(authRouter);
app.use(clothingItemRouter);

// 404 handler
app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

// Global error handler LAST
app.use(errorHandler);

module.exports = app;
