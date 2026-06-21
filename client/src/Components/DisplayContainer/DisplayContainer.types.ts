import { IWeatherDisplayProps } from "../../Types/weather.types";

export interface DisplayContainerProps {
  weatherData: IWeatherDisplayProps;
  emoji: string;
  name: string;
}