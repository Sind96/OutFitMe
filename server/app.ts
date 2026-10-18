import express from "express";
import cors from "cors";

import authRouter = require("./routes/auth.routes");
import clothingItemRouter = require("./routes/clothingItem.routes");
import weatherRouter = require("./routes/weather.routes");
import errorHandler = require("./middleware/error.middleware");
import AppError = require("./utils/AppError");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ message: "OutFitMe API is running" });
});

app.use(authRouter);
app.use(clothingItemRouter);
app.use(weatherRouter);

app.use((_req, _res, next) => {
  next(new AppError("Route not found", 404));
});

app.use(errorHandler);

export = app;
