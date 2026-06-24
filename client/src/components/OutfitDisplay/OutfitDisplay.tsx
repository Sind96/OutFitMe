import { useState } from "react";
import Button from "../Button/Button";
import "./OutfitDisplay.css";
import { IoShirtOutline } from "react-icons/io5";
import { PiPants } from "react-icons/pi";
import { LiaShoePrintsSolid } from "react-icons/lia";
import UploadModal from "../UploadModal/UploadModal";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import type { OutfitDisplayProps } from "./OutfitDisplay.types";
import { useOutfitGenerator } from "../../hooks/useOutfitGenerator";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function OutfitDisplay({ weatherData, onUploadSuccess }: OutfitDisplayProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddItemClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { outfit, generateOutfit, isLoading, error } =
    useOutfitGenerator(weatherData);

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
              text={isLoading ? "Generating..." : "OutFitMe!"}
              onClick={generateOutfit}
              disabled={isLoading}
            />
          </div>

          {isLoading && <LoadingSpinner text="Generating outfit..." />}
          {error && <p className="outfit-error">{error}</p>}
        </div>
      </div>
      {isModalOpen && (
        <UploadModal
          onClose={handleCloseModal}
          onUploadSuccess={onUploadSuccess}
        />
      )}
    </>
  );
}

export default OutfitDisplay;
