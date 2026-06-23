const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

exports.getWeather = asyncHandler(async (req, res) => {
  const { lat, lon } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new AppError("OpenWeather API key is missing", 500);
  }

  if (!lat || !lon) {
    throw new AppError("Latitude and longitude are required", 400);
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const weatherData = await response.json();

  if (!response.ok) {
    throw new AppError(
      weatherData.message || "Failed to fetch weather data",
      response.status,
    );
  }

  return res.status(200).json(weatherData);
});
