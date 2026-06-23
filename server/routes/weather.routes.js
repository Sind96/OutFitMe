const express = require("express");
const router = express.Router();

const weather = require("../controllers/weather.controller");

router.get("/api/weather", weather.getWeather);

module.exports = router;
