import styles from "./login.module.css"
import { useState, useEffect } from 'react';
import { getWeatherData } from '../../Services/apiService';
import { IWeatherDisplayProps } from '../../Types/App.Types'
import { Link } from 'react-router-dom';

export default function SignIn () {
  
  const [signInForm, setSignInForm] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setSignInForm({
      ...signInForm,
      [e.target.name]: e.target.value
    })
  }
  
    //WEATHER

  const [clicked, setClicked] = useState<boolean>(false);

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
  
    const handleSubmit = async (event) => {
      event.preventDefault();
    }

    const [ isLoading, setIsLoading] = useState(false);
    const [ error, setError] = useState(false);


  return (
  <main className="bg-blue-50 h-screen">
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-7"> Sign In </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 "
        >
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={signInForm.username}
          className="bg-white p-3 rounded-lg"
          onChange={handleChange}
          required
          />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={signInForm.password}
          className="bg-white p-3 rounded-lg"
          onChange={handleChange}
          required
          />
        <button
          disabled={isLoading}
          className="bg-blue-600 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-60">
            {isLoading ? 'Creating' : 'SIGN IN'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>{`Don't have an account?`}</p>
        <Link to={'/sign-up'}>
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5"> {error ? error  || 'something went wrong' : ''} </p>
    </div>
  </main>
  );
}