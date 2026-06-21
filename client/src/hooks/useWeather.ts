import { useEffect, useState } from "react";

import { getWeatherData } from "../services/weatherService";
import type { IWeatherDisplayProps } from "../types/weather.types";
import { getWeatherEmoji } from "../utils/weatherHelpers";

const initialWeatherData: IWeatherDisplayProps = {
  location: "",
  temp: 0,
  temp_max: 0,
  temp_min: 0,
  humidity: 0,
  feels_like: 0,
  description: "",
};

export const useWeather = () => {
  const [weatherData, setWeatherData] =
    useState<IWeatherDisplayProps>(initialWeatherData);

  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    if (!weatherData.description) return;

    setEmoji(getWeatherEmoji(weatherData.description));
  }, [weatherData.description]);

  const getWeather = async (lat: number, lon: number) => {
    const weatherData = await getWeatherData(lat, lon);

    const {
      name: location,
      main: { temp, humidity, feels_like, temp_max, temp_min },
      weather: [{ main }],
    } = weatherData;

    setWeatherData({
      location,
      temp,
      temp_max,
      temp_min,
      humidity,
      feels_like,
      description: main,
    });
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
      });
    } else {
      alert("Please enable geolocation to use this app.");
    }
  };

  return {
    weatherData,
    emoji,
    getLocation,
  };
};
