import type { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

interface WeatherQuery {
  lat?: string;
  lon?: string;
}

interface WeatherErrorResponse {
  message?: string;
}

const getWeather = asyncHandler(async (req: Request, res: Response) => {
  const { lat, lon } = req.query as WeatherQuery;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new AppError("OpenWeather API key is missing", 500);
  }

  if (!lat || !lon) {
    throw new AppError("Latitude and longitude are required", 400);
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const weatherData: unknown = await response.json();

  if (!response.ok) {
    const errorData = weatherData as WeatherErrorResponse | null;

    throw new AppError(
      errorData?.message || "Failed to fetch weather data",
      response.status,
    );
  }

  return res.status(200).json(weatherData);
});

export { getWeather };
