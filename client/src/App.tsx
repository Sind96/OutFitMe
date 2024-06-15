import './App.css';
import { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import DisplayContainer from './Components/DisplayContainer/DisplayContainer';
import { getWeatherData } from './Services/apiService';
import LoginPage from './Components/LoginPage/LoginPage';
import Gallery from './Components/Gallery/Gallery';
import { IWeatherDisplayProps } from './Types/App.Types'


function App() {
  //TODO: Style the page where user accepts to give their location first, have that accept button get weather and random outfit
  // to avoid having to click two buttons

  //NAME
  const [name, setName] = useState<string>('');

  //WEATHER
  const [weatherData, setWeatherData] = useState<IWeatherDisplayProps>({
    location: '',
    temp: '',
    temp_max: '',
    temp_min: '',
    humidity: '',
    feels_like: '',
    description: '',
  });

  const [emoji, setEmoji] = useState('');
  const [clicked, setClicked] = useState(false);

  //GALLERIES
  const [itemType, setItemType] = useState<string>('');
  const [gallery, setGallery] = useState<string>('');

  ////////////////////////////////////////////////////////////////////////////

  //NAME
  const handleName = (event : React.MouseEvent) => {
    setName(event.currentTarget.value);
  };

  //WEATHER
  useEffect(() => {
    if (weatherData.description === '') return;

    const descriptionToday = weatherData.description;

    switch (descriptionToday) {
      case 'Thunderstorm':
        setEmoji('⛈');
        break;
      case 'Drizzle':
        setEmoji('🌧');
        break;
      case 'Rain':
        setEmoji('🌧');
        break;
      case 'Snow':
        setEmoji('🌨');
        break;
      case 'Clouds':
        setEmoji('⛅');
        break;
      default: //'Clear'
        setEmoji('☀');
    }
  }, [weatherData.description]);

  const getLocation = (event : React.MouseEvent) => {
    event.preventDefault();

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        getWeather(lat, lon);
        setClicked(true);
      });
    } else {
      alert('Please enable geolocation to use this app.'); //TODO: maybe try sweetalert2?  https://sweetalert2.github.io/
    }
  };

  const getWeather = (lat: number, lon: number) => {
    //apiService method for weather gets lat and lon as arguments to add to the url
    getWeatherData(lat, lon).then((weatherData) => {
      const {
        name: location,
        main: { temp, humidity, feels_like, temp_max, temp_min },
        weather: [{ main }],
      } = weatherData;
      setWeatherData({
        location: location,
        temp: temp,
        temp_max: temp_max,
        temp_min: temp_min,
        humidity: humidity,
        feels_like: feels_like,
        description: main,
      });
    });
  };

  //GALLERIES
  const onMenuClick = async (itemType: string) => {
    setItemType(itemType);
    setGallery(itemType);
  };

  return (
    <>
      {!clicked ? (
        <LoginPage
          getLocation={getLocation}
          name={name}
          handleName={handleName}
        />
      ) : (
        <div className="app-container">
          <div className="sidebar">
            <Sidebar onMenuClick={onMenuClick} />
          </div>

          <div className="display-container">
            {!gallery ? (
              <DisplayContainer
                weatherData={weatherData}
                emoji={emoji}
                name={name}
              />
            ) : (
              <Gallery itemType={itemType} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default App;
