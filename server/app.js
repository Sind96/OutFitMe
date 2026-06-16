const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/auth.routes");
const imageRouter = require("./routes/image.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "OutFitMe API is running" });
});

// Routes
app.use(authRouter);
app.use(imageRouter);

// 404 handler LAST
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
