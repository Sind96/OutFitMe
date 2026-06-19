const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/auth.routes");
const clothingItemRouter = require("./routes/clothingItem.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({ message: "OutFitMe API is running" });
});

// Routes
app.use(authRouter);
app.use(clothingItemRouter);

// 404 handler LAST
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
