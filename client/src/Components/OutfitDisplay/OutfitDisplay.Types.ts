import type { IWeatherDisplayProps } from "../../Types/App.Types";

export interface OutfitDisplayProps {
  weatherData: Pick<IWeatherDisplayProps, "temp" | "description">;
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
