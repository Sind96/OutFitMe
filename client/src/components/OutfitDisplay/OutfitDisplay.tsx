import { useState } from "react";
import Button from "../Button/Button";
import "./OutfitDisplay.css";
import { IoShirtOutline } from "react-icons/io5";
import { PiHeartStraight, PiHeartStraightFill, PiPants } from "react-icons/pi";
import { LiaShoePrintsSolid } from "react-icons/lia";
import UploadModal from "../UploadModal/UploadModal";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import type { OutfitDisplayProps } from "./OutfitDisplay.types";
import { useOutfitGenerator } from "../../hooks/useOutfitGenerator";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import {
  addFavoriteOutfit,
  removeFavoriteOutfit,
} from "../../services/authService";
import { useAppSelector } from "../../store/hooks/reduxHooks";

function OutfitDisplay({ weatherData, onUploadSuccess }: OutfitDisplayProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [savedFavouriteId, setSavedFavouriteId] = useState<string | null>(null);

  const { outfit, generateOutfit, isLoading, error } =
    useOutfitGenerator(weatherData);

  const { currentUser } = useAppSelector((state) => state.user);

  const isOutfitSaved = Boolean(savedFavouriteId);

  const handleAddItemClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGenerateOutfit = async () => {
    setSavedFavouriteId(null);
    await generateOutfit();
  };

  const toggleFavouriteOutfit = async () => {
    if (!currentUser?._id) {
      toast.error("You need to be signed in to save an outfit.");
      return;
    }

    if (!outfit.top || !outfit.bottom || !outfit.shoe) {
      toast.error("Generate a complete outfit before saving.");
      return;
    }

    try {
      if (savedFavouriteId) {
        await removeFavoriteOutfit(currentUser._id, savedFavouriteId);
        setSavedFavouriteId(null);
        toast.success("Outfit removed from favourites.");
        return;
      }

      const favouriteOutfits = await addFavoriteOutfit(currentUser._id, outfit);

      const savedOutfit = favouriteOutfits.find(
        (favourite) =>
          favourite.top === outfit.top &&
          favourite.bottom === outfit.bottom &&
          favourite.shoe === outfit.shoe,
      );

      setSavedFavouriteId(savedOutfit?._id ?? null);
      toast.success("Outfit saved to favourites.");
    } catch (error) {
      console.error("Failed to update favourite outfit", error);
      toast.error("Failed to update favourite outfit.");
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
              onClick={handleGenerateOutfit}
              disabled={isLoading}
            />
            {outfit.top && outfit.bottom && outfit.shoe && (
              <button
                type="button"
                className={`saveOutfitButton ${isOutfitSaved ? "saved" : ""}`}
                onClick={toggleFavouriteOutfit}
                aria-label={
                  isOutfitSaved
                    ? "Remove outfit from favourites"
                    : "Save outfit"
                }
              >
                {isOutfitSaved ? <PiHeartStraightFill /> : <PiHeartStraight />}
              </button>
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
