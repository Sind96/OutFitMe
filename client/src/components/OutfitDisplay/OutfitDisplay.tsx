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
import { toast } from "react-toastify";
import { addFavoriteOutfit } from "../../services/authService";
import { useAppSelector } from "../../store/hooks/reduxHooks";

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

  const { currentUser } = useAppSelector((state) => state.user);

  const saveOutfit = async () => {
    if (!currentUser?._id) {
      toast.error("You need to be signed in to save an outfit.");
      return;
    }
    if (!outfit.top || !outfit.bottom || !outfit.shoe) {
      toast.error("Generate a complete outfit before saving.");
      return;
    }
    try {
      await addFavoriteOutfit(currentUser._id, outfit);
      toast.success("Outfit saved to favourites.");
    } catch (error) {
      console.error("Failed to save outfit", error);
      toast.error("Failed to save outfit.");
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
              text={isLoading ? "Generating..." : "OutFitMe!"}
              onClick={generateOutfit}
              disabled={isLoading}
            />
            {outfit.top && outfit.bottom && outfit.shoe && (
              <Button
                className="saveOutfitButton"
                text="❤ Save Outfit"
                onClick={saveOutfit}
              />
            )}
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
