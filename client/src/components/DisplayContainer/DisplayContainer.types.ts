import { IWeatherDisplayProps } from "../../types/weather.types";

export interface DisplayContainerProps {
  weatherData: IWeatherDisplayProps;
  emoji: string;
  name: string;
}