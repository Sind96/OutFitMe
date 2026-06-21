interface Ranges {
  [key: string]: boolean;
  cold: boolean;
  cool: boolean;
  warm: boolean;
  hot: boolean;
}

const temperatureToWeather = (temp: number): string => {
  const ranges: Ranges = {
    cold: temp <= 10,
    cool: temp > 10 && temp <= 18,
    warm: temp > 18 && temp <= 25,
    hot: temp > 25,
  };

  for (const weather in ranges) {
    if (ranges[weather]) return weather;
  }

  return "";
};

const rainToWeather = (description: string): boolean => {
  if (
    description === "Thunderstorm" ||
    description === "Drizzle" ||
    description === "Rain" ||
    description === "Snow"
  ) {
    return false;
  }

  return true;
};

export { temperatureToWeather, rainToWeather };
