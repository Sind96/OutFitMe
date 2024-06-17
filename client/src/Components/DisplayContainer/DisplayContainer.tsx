import OutfitDisplay from '../OutfitDisplay/OutfitDisplay';
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay';
import './DisplayContainer.css';
import { PiPlusCircle } from "react-icons/pi";

import {IWeatherDisplayProps} from '../../Types/App.Types';

interface DisplayContainerProps {
  weatherData: IWeatherDisplayProps;
  emoji: string;
  name: string;

}

function DisplayContainer({ weatherData, emoji, name }: DisplayContainerProps) {
  return (
    <>
      <div className="main">

        <h1 className="welcome-message">
        Welcome, {name}! <br /> <span className='subtext'>Ready to create your perfect outfit for today?</span>
        </h1>

        <WeatherDisplay weatherData={weatherData} emoji={emoji} />
        <OutfitDisplay weatherData={weatherData} />
        <div className="displays">
        </div>

      </div>
    </>
  );
}

export default DisplayContainer;
