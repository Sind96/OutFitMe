import { useState } from "react";
import { getRandomItem } from "../services/clothingItemService";
import { rainToWeather, temperatureToWeather } from "../utils/helperFunctions";
import type { IWeatherDisplayProps } from "../types/weather.types";
import type {
  Outfit,
  WeatherCriteria,
} from "../components/OutfitDisplay/OutfitDisplay.types";

export const useOutfitGenerator = (
  weatherData: Pick<IWeatherDisplayProps, "temp" | "description">,
  userId?: string,
) => {
  const [outfit, setOutfit] = useState<Outfit>({
    top: "",
    bottom: "",
    shoe: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateOutfit = async () => {
    const weatherCriteria: WeatherCriteria = {
      isDryWeather: rainToWeather(weatherData.description),
      tempToday: temperatureToWeather(weatherData.temp),
    };

    if (!weatherCriteria.tempToday) {
      setError("Weather data is not available yet.");
      return;
    }

    if (!userId) {
      setError("You need to be signed in to generate an outfit.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const [top, bottom, shoe] = await Promise.all([
        getRandomItem(
          userId,
          "top",
          weatherCriteria.tempToday,
          weatherCriteria.isDryWeather,
        ),
        getRandomItem(
          userId,
          "bottom",
          weatherCriteria.tempToday,
          weatherCriteria.isDryWeather,
        ),
        getRandomItem(
          userId,
          "shoe",
          weatherCriteria.tempToday,
          weatherCriteria.isDryWeather,
        ),
      ]);

      setOutfit({ top, bottom, shoe });
    } catch (error) {
      console.error("Failed to generate outfit", error);
      setError("Unable to generate outfit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    outfit,
    generateOutfit,
    isLoading,
    error,
  };
};
