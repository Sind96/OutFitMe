import { baseURL, handleResponse } from "./apiClient";
import type { OpenWeatherResponse } from "../types/weather.types";

const getWeatherData = async (
  lat: number,
  lon: number,
): Promise<OpenWeatherResponse> => {
  const response = await fetch(`${baseURL}/api/weather?lat=${lat}&lon=${lon}`);

  return handleResponse<OpenWeatherResponse>(response);
};

export { getWeatherData };
