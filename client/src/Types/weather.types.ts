export interface IWeatherDisplayProps {
  location: string;
  temp: number;
  temp_max: number;
  temp_min: number;
  humidity: number;
  feels_like: number;
  description: string;
}

export interface OpenWeatherResponse {
  name: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
    feels_like: number;
  };
  weather: {
    main: string;
  }[];
}
