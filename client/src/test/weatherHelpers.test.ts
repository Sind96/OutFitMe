import { describe, expect, it } from "vitest";
import { getWeatherEmoji } from "../Utils/weatherHelpers";

describe("getWeatherEmoji", () => {
  it("returns storm emoji for Thunderstorm", () => {
    expect(getWeatherEmoji("Thunderstorm")).toBe("⛈");
  });

  it("returns rain emoji for Drizzle and Rain", () => {
    expect(getWeatherEmoji("Drizzle")).toBe("🌧");
    expect(getWeatherEmoji("Rain")).toBe("🌧");
  });

  it("returns snow emoji for Snow", () => {
    expect(getWeatherEmoji("Snow")).toBe("🌨");
  });

  it("returns cloud emoji for Clouds", () => {
    expect(getWeatherEmoji("Clouds")).toBe("⛅");
  });

  it("returns sun emoji for unknown or clear weather", () => {
    expect(getWeatherEmoji("Clear")).toBe("☀");
    expect(getWeatherEmoji("Mist")).toBe("☀");
  });
});
