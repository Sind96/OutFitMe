import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import DisplayContainer from "../components/DisplayContainer/DisplayContainer";

const mockWeatherData = {
  location: "London",
  temp: 18,
  temp_min: 14,
  temp_max: 21,
  humidity: 65,
  feels_like: 17,
  description: "Clouds",
};

describe("DisplayContainer", () => {
  it("renders the personalised welcome message", () => {
    render(
      <DisplayContainer
        weatherData={mockWeatherData}
        emoji="⛅"
        name="Sindhu"
      />,
    );

    expect(screen.getByText(/Welcome, Sindhu!/)).toBeInTheDocument();
    expect(
      screen.getByText("Ready to create your perfect outfit for today?"),
    ).toBeInTheDocument();
  });

  it("renders the weather information", () => {
    render(
      <DisplayContainer
        weatherData={mockWeatherData}
        emoji="⛅"
        name="Sindhu"
      />,
    );

    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("18ºC")).toBeInTheDocument();
  });

  it("renders the outfit action button", () => {
    render(
      <DisplayContainer
        weatherData={mockWeatherData}
        emoji="⛅"
        name="Sindhu"
      />,
    );

    expect(
      screen.getByRole("button", { name: "OutFitMe!" }),
    ).toBeInTheDocument();
  });
});
