import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import WeatherDisplay from "../components/WeatherDisplay/WeatherDisplay";

const mockWeatherData = {
  location: "London",
  temp: 18.6,
  temp_min: 15.2,
  temp_max: 21.8,
  humidity: 72,
  feels_like: 17.9,
  description: "Clouds",
};

describe("WeatherDisplay", () => {
  it("renders the location", () => {
    render(<WeatherDisplay weatherData={mockWeatherData} emoji="⛅" />);

    expect(screen.getByText("London")).toBeInTheDocument();
  });

  it("renders the rounded current temperature", () => {
    render(<WeatherDisplay weatherData={mockWeatherData} emoji="⛅" />);

    expect(screen.getByText("19ºC")).toBeInTheDocument();
  });

  it("renders the weather emoji", () => {
    render(<WeatherDisplay weatherData={mockWeatherData} emoji="⛅" />);

    expect(screen.getByText("⛅")).toBeInTheDocument();
  });

  it("renders the min and max temperatures rounded", () => {
    render(<WeatherDisplay weatherData={mockWeatherData} emoji="⛅" />);

    expect(screen.getByText(/15º/)).toBeInTheDocument();
    expect(screen.getByText(/22º/)).toBeInTheDocument();
  });

  it("renders humidity, feels-like temperature, and description", () => {
    render(<WeatherDisplay weatherData={mockWeatherData} emoji="⛅" />);

    expect(screen.getByText("Humidity: 72%")).toBeInTheDocument();
    expect(screen.getByText("Feels like: 18ºC")).toBeInTheDocument();
    expect(screen.getByText("Clouds")).toBeInTheDocument();
  });
});
