import { describe, expect, it } from "vitest";
import { rainToWeather, temperatureToWeather } from "../Utils/helperFunctions";

describe("temperatureToWeather", () => {
  it("returns cold for temperatures 10 or below", () => {
    expect(temperatureToWeather(10)).toBe("cold");
    expect(temperatureToWeather(0)).toBe("cold");
  });

  it("returns cool for temperatures above 10 and up to 18", () => {
    expect(temperatureToWeather(11)).toBe("cool");
    expect(temperatureToWeather(18)).toBe("cool");
  });

  it("returns warm for temperatures above 18 and up to 25", () => {
    expect(temperatureToWeather(19)).toBe("warm");
    expect(temperatureToWeather(25)).toBe("warm");
  });

  it("returns hot for temperatures above 25", () => {
    expect(temperatureToWeather(26)).toBe("hot");
  });
});

describe("rainToWeather", () => {
  it("returns false for wet weather conditions", () => {
    expect(rainToWeather("Thunderstorm")).toBe(false);
    expect(rainToWeather("Drizzle")).toBe(false);
    expect(rainToWeather("Rain")).toBe(false);
    expect(rainToWeather("Snow")).toBe(false);
  });

  it("returns true for dry weather conditions", () => {
    expect(rainToWeather("Clear")).toBe(true);
    expect(rainToWeather("Clouds")).toBe(true);
  });
});
