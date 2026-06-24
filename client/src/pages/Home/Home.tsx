import { useAppSelector } from "../../store/hooks/reduxHooks";
import DisplayContainer from "../../components/DisplayContainer/DisplayContainer";
import Gallery from "../../components/Gallery/Gallery";
import Navbar from "../../components/Navbar/Navbar";
import type { IWeatherDisplayProps } from "../../types/weather.types";
import { HomeProps } from "./Home.types";
import { useState } from "react";

export default function Home({
  weatherData,
  emoji,
  onMenuClick,
  itemType,
}: HomeProps) {
  const { currentUser } = useAppSelector((state) => state.user);
  const [galleryRefreshKey, setGalleryRefreshKey] = useState(0);

  if (!currentUser) {
    return null;
  }

  const refreshGallery = () => {
    setGalleryRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="display-container">
      {!itemType ? (
        <DisplayContainer
          weatherData={weatherData}
          emoji={emoji}
          name={currentUser.username}
          onUploadSuccess={refreshGallery}
        />
      ) : (
        <div className="app-container gallery">
          <Gallery itemType={itemType} refreshKey={galleryRefreshKey} />
        </div>
      )}

      <div className="app-container">
        <Navbar onMenuClick={onMenuClick} />
      </div>
    </div>
  );
}
