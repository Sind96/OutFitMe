import type { WeatherCondition } from "../Types/weather.types";

const getWeatherEmoji = (condition: WeatherCondition): string => {
  switch (condition) {
    case "Thunderstorm":
      return "⛈";
    case "Drizzle":
    case "Rain":
      return "🌧";
    case "Snow":
      return "🌨";
    case "Clouds":
      return "⛅";
    default:
      return "☀";
  }
};

export { getWeatherEmoji };
