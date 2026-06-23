import { handleResponse } from "./apiClient";
import type { OpenWeatherResponse } from "../types/weather.types";

const weatherAPIkey = import.meta.env.VITE_OPENWEATHER_API_KEY;
console.log(weatherAPIkey);

const getWeatherData = async (
  lat: number,
  lon: number,
): Promise<OpenWeatherResponse> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPIkey}&units=metric`;
  console.log(url);

  const response = await fetch(url);

  return handleResponse<OpenWeatherResponse>(response);
};

export { getWeatherData };
