import OutfitDisplay from "../OutfitDisplay/OutfitDisplay";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
import "./DisplayContainer.css";
import type { DisplayContainerProps } from "./DisplayContainer.types";

function DisplayContainer({ weatherData, emoji, name }: DisplayContainerProps) {
  return (
    <div className="main">
      <h1 className="welcome-message">
        Welcome, {name}! <br />
        <span className="subtext">
          Ready to create your perfect outfit for today?
        </span>
      </h1>

      <WeatherDisplay weatherData={weatherData} emoji={emoji} />
      <OutfitDisplay weatherData={weatherData} />
    </div>
  );
}

export default DisplayContainer;
