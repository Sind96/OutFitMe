import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getWeatherData } from './Services/apiService';
import { IWeatherDisplayProps } from './Types/App.Types';
// import LoginPage from './Components/LoginPage/LoginPage';
import SignIn from './Pages/Login/SignIn';
import SignUp from './Pages/Login/SignUp';
import Home from './Pages/Home/Home';
import Profile from './Pages/profile/Profile';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';



function App() {
  //TODO: Style the page where user accepts to give their location first, have that accept button get weather and random outfit
  // to avoid having to click two buttons

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

  const [emoji, setEmoji] = useState<string>('');

  //GALLERIES
  const [itemType, setItemType] = useState<string>('');
  const [gallery, setGallery] = useState<string>('');

  ////////////////////////////////////////////////////////////////////////////
  
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
    // event.preventDefault();
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        getWeather(lat, lon);
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn getLocation={getLocation} />}  />
          <Route path="/signup" element={<SignUp />}  />
          <Route element={<PrivateRoute />} >
            <Route path='/home' element={<Home gallery={gallery} weatherData={weatherData} emoji={emoji} onMenuClick={onMenuClick} itemType={itemType}/>} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
