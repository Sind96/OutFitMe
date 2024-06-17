import { temperatureToWeather, rainToWeather, asyncCallHelper } from '../../Utils/helperFunctions';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import './OutfitDisplay.css';
import { IoShirtOutline } from "react-icons/io5";
import { PiPants } from "react-icons/pi";
import { LiaShoePrintsSolid } from "react-icons/lia";
import UploadModal from '../UploadModal/UploadModal';
import { PiPlusCircle } from "react-icons/pi";

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
    top: 'https://www.creativefabrica.com/wp-content/uploads/2020/04/21/Tshirt-icon-black-thin-stripe-2-Graphics-3920769-1-1-580x386.jpg',
    bottom:'https://static.vecteezy.com/system/resources/previews/010/347/283/non_2x/pants-boy-garment-line-icon-illustration-vector.jpg',
    shoe: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Running_shoe_icon.png/640px-Running_shoe_icon.png',
  });

  //state to gather and send current weather info as params in request URLs
  const [weatherToday, setWeatherToday] = useState<WeatherToday>({
    tempToday: '',
    rainToday: false,
  });

  //onclick gather weather info to send via request
  const generateOutfit = async (event: React.MouseEvent) => {
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
          <div className='iconAndImage'>
          < IoShirtOutline className="tops clothing-item"/><button className="plusIcon" onClick={handleAddItemClick}><PiPlusCircle /></button>
        </div>
          < PiPants className="bottoms clothing-item"/>
          < LiaShoePrintsSolid className="shoes clothing-item"/>
        </div>
        <div className="OutFitMeButton">
          <Button className="outfitMeButton" text="OutFitMe!" onClick={generateOutfit} />
        </div>
      </div>
        {isModalOpen && <UploadModal onClose={handleCloseModal} />}
    </>
  );
}

export default OutfitDisplay;
