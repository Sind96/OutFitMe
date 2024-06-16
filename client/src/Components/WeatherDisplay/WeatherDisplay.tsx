import './WeatherDisplay.css';
import { FaLocationDot } from "react-icons/fa6";

interface WeatherDisplayProps {
  weatherData: {
    location: string;
    temp: string;
    temp_min: string;
    temp_max: string;
    humidity: string;
    feels_like: string;
    description: string;
  };
  emoji: string;

}

function WeatherDisplay({ weatherData, emoji }: WeatherDisplayProps) {

  return (
    <div className="weather-container">

      <div className="top-data">
        <p className="locationapidata"><FaLocationDot className='locationicon'/>{weatherData.location}</p>
      </div>


      <div className='tempandemojicontainer'>
        <div className='tempandemoji'>
        <p className="temperatureapidata">{Math.round(Number(weatherData.temp))}ºC</p><div className="emojiapidata">{emoji}</div>
        </div>
        <div className='humidityFeelslikeDesc'>
        <p className="apidata">{Math.round(Number(weatherData.temp_min))}º/{Math.round(Number(weatherData.temp_max))}º</p>
        <p className="humidity">Humidity: {weatherData.humidity}% </p>
        <p className="feelslike">Feels like: {Math.round(Number(weatherData.feels_like))}ºC</p>
        <p className="weatherDescription">{weatherData.description}</p>
      </div>
    </div>
    </div>
  );
}

export default WeatherDisplay;
