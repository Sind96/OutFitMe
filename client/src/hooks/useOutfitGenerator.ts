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
) => {
  const [outfit, setOutfit] = useState<Outfit>({
    top: "",
    bottom: "",
    shoe: "",
  });

  const generateOutfit = async () => {
    const weatherCriteria: WeatherCriteria = {
      isDryWeather: rainToWeather(weatherData.description),
      tempToday: temperatureToWeather(weatherData.temp),
    };

    if (!weatherCriteria.tempToday) return;

    try {
      const [top, bottom, shoe] = await Promise.all([
        getRandomItem(
          "top",
          weatherCriteria.tempToday,
          weatherCriteria.isDryWeather,
        ),
        getRandomItem(
          "bottom",
          weatherCriteria.tempToday,
          weatherCriteria.isDryWeather,
        ),
        getRandomItem(
          "shoe",
          weatherCriteria.tempToday,
          weatherCriteria.isDryWeather,
        ),
      ]);

      setOutfit({ top, bottom, shoe });
    } catch (error) {
      console.error("Failed to generate outfit", error);
    }
  };

  return {
    outfit,
    generateOutfit,
  };
};
