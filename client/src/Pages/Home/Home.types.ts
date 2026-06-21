import type { IWeatherDisplayProps } from "../../Types/weather.types";

export interface HomeProps {
  weatherData: IWeatherDisplayProps;
  emoji: string;
  onMenuClick: (itemType: string) => void;
  itemType: string;
}
