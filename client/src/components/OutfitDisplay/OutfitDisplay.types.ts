import { IWeatherDisplayProps } from "../../types/weather.types";

export interface OutfitDisplayProps {
  weatherData: Pick<IWeatherDisplayProps, "temp" | "description">;
  onUploadSuccess: () => void;
}

export interface Outfit {
  top: string;
  bottom: string;
  shoe: string;
}

export interface WeatherCriteria {
  tempToday: string;
  isDryWeather: boolean;
}
