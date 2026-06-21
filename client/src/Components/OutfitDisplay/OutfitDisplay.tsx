import { useState } from "react";
import {
  temperatureToWeather,
  rainToWeather,
} from "../../Utils/helperFunctions";
import { getRandomItem } from "../../Services/apiService";
import Button from "../Button/Button";
import "./OutfitDisplay.css";
import { IoShirtOutline } from "react-icons/io5";
import { PiPants } from "react-icons/pi";
import { LiaShoePrintsSolid } from "react-icons/lia";
import UploadModal from "../UploadModal/UploadModal";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import type {
  Outfit,
  OutfitDisplayProps,
  WeatherCriteria,
} from "./OutfitDisplay.types";

function OutfitDisplay({ weatherData }: OutfitDisplayProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddItemClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //state to set imgURL's in display
  const [outfit, setOutfit] = useState<Outfit>({
    top: "",
    bottom: "",
    shoe: "",
  });

  //onclick gather weather info to send via request
  const generateOutfit = async () => {
    const weatherDataTemp = Number(weatherData.temp);
    const weatherDataDescription = weatherData.description;

    const weatherCriteria: WeatherCriteria = {
      isDryWeather: rainToWeather(weatherDataDescription),
      tempToday: temperatureToWeather(weatherDataTemp),
    };

    if (!weatherCriteria.tempToday) return;

    try {
      const [top, bottom, shoe] = await Promise.all([
        getRandomItem(
          "top",
          weatherCriteria.tempToday,
          weatherCriteria.isDryWeather,
        ),
        getRandomItem(
          "bottom",
          weatherCriteria.tempToday,
          weatherCriteria.isDryWeather,
        ),
        getRandomItem(
          "shoe",
          weatherCriteria.tempToday,
          weatherCriteria.isDryWeather,
        ),
      ]);

      setOutfit({ top, bottom, shoe });
    } catch (error) {
      console.error("Failed to generate outfit", error);
    }
  };

  return (
    <>
      <div className="OutfitDisplayContainer">
        <div className="random-outfit">
          {outfit.top ? (
            <Zoom>
              <img src={outfit.top} alt="top" className="tops clothing-item" />
            </Zoom>
          ) : (
            <IoShirtOutline className="tops clothing-item" />
          )}

          {outfit.bottom ? (
            <Zoom>
              <img
                src={outfit.bottom}
                alt="bottom"
                className="bottom clothing-item"
              />
            </Zoom>
          ) : (
            <PiPants className="bottoms clothing-item" />
          )}

          {outfit.shoe ? (
            <Zoom>
              <img
                src={outfit.shoe}
                alt="shoe"
                className="shoes clothing-item"
              />
            </Zoom>
          ) : (
            <LiaShoePrintsSolid className="shoes clothing-item" />
          )}
        </div>
        <div className="OutFitMeButton">
          <div className="buttonsTogether">
            <Button
              className="plusIcon"
              text="+"
              onClick={handleAddItemClick}
            />
            <Button
              className="outfitMeButton"
              text="OutFitMe!"
              onClick={generateOutfit}
            />
          </div>
        </div>
      </div>
      {isModalOpen && <UploadModal onClose={handleCloseModal} />}
    </>
  );
}

export default OutfitDisplay;
