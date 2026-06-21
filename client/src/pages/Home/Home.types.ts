import type { IWeatherDisplayProps } from "../../types/weather.types";

export interface HomeProps {
  weatherData: IWeatherDisplayProps;
  emoji: string;
  onMenuClick: (itemType: string) => void;
  itemType: string;
}
