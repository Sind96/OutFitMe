import { temperatureToWeather, rainToWeather, asyncCallHelper } from '../../Utils/helperFunctions';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import './OutfitDisplay.css';
import { IoShirtOutline } from "react-icons/io5";
import { PiPants } from "react-icons/pi";
import { LiaShoePrintsSolid } from "react-icons/lia";
import UploadModal from '../UploadModal/UploadModal';
import React from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface WeatherData {
  weatherData: {
    temp: string;
    description: string;
  }
} 
interface Outfit {
  top: string;
  bottom: string;
  shoe: string;
}
interface WeatherToday {
  tempToday: string;
  rainToday: boolean ;
}

function OutfitDisplay({weatherData}: WeatherData) {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

const handleAddItemClick = () => {
  setIsModalOpen(true);
};

const handleCloseModal = ()  => {
  setIsModalOpen(false);
};

  //state to set imgURL's in display
  const [outfit, setOutfit] = useState<Outfit>({
    top: '',
    bottom:'',
    shoe: '',
  });

  //state to gather and send current weather info as params in request URLs
  const [weatherToday, setWeatherToday] = useState<WeatherToday>({
    tempToday: '',
    rainToday: false,
  });

  //onclick gather weather info to send via request
  const generateOutfit = async () => {
    gatherWeather();
  };

  //extract info from weatherdata and set it
  const gatherWeather = (): void => {
    const weatherDataTemp = Number(weatherData.temp);
    const weatherDataDescription = weatherData.description;

    setWeatherToday({
      rainToday: rainToWeather(weatherDataDescription),
      tempToday: temperatureToWeather(weatherDataTemp),
    });
  };

  //once weatherdata is correctly set, make requests and set outfit data
  useEffect(() => {
    if (weatherToday.tempToday === '' || weatherToday.rainToday === false) return;

    const { tempToday, rainToday } = weatherToday;

    asyncCallHelper('top', tempToday, rainToday).then((res) => {
      setOutfit((prevOutfit) => ({ ...prevOutfit, top: res }));
    });
    asyncCallHelper('bottom', tempToday, rainToday).then((res) => {
      setOutfit((prevOutfit) => ({ ...prevOutfit, bottom: res }));
    });
    asyncCallHelper('shoe', tempToday, rainToday).then((res) => {
      setOutfit((prevOutfit) => ({ ...prevOutfit, shoe: res }));
    });
  }, [weatherToday]);

  return (
    <>
      <div className="OutfitDisplayContainer">
        <div className="random-outfit">
          { outfit.top ? 
              <Zoom><img src={outfit.top} alt="top" className="tops clothing-item" /></Zoom>
            : < IoShirtOutline className="tops clothing-item"/>
          }
         
        { outfit.bottom ?
          <Zoom><img src={outfit.bottom} alt="bottom" className="bottom clothing-item" /></Zoom>
          : < PiPants className="bottoms clothing-item"/> }
          
        { outfit.shoe ?
          <Zoom><img src={outfit.shoe} alt="shoe" className="shoes clothing-item" /></Zoom>
          :  < LiaShoePrintsSolid className="shoes clothing-item"/>
        }

        </div>
        <div className="OutFitMeButton">
          <div className='buttonsTogether'>
          <Button className="plusIcon" text="+" onClick={handleAddItemClick} />
          <Button className="outfitMeButton" text="OutFitMe!" onClick={generateOutfit} />
          </div>
        </div>
      </div>
        {isModalOpen && <UploadModal onClose={handleCloseModal} />}
    </>
  );
}

export default OutfitDisplay;
