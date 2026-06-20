import type { IWeatherDisplayProps } from "../../Types/App.Types";

export interface DisplayContainerProps {
  weatherData: IWeatherDisplayProps;
  emoji: string;
  name: string;
}