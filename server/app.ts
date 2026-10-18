import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import clothingItemRouter from "./routes/clothingItem.routes.js";
import weatherRouter from "./routes/weather.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import AppError from "./utils/AppError.js";

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

export default app;
