import { useAppSelector } from "../../store/hooks/reduxHooks";
import DisplayContainer from "../../Components/DisplayContainer/DisplayContainer";
import Gallery from "../../Components/Gallery/Gallery";
import Sidebar from "../../Components/Sidebar/Sidebar";
import type { IWeatherDisplayProps } from "../../Types/App.Types";

interface HomeProps {
  gallery: string;
  weatherData: IWeatherDisplayProps;
  emoji: string;
  onMenuClick: (itemType: string) => void;
  itemType: string;
}

export default function Home({
  gallery,
  weatherData,
  emoji,
  onMenuClick,
  itemType,
}: HomeProps) {
  const { currentUser } = useAppSelector((state) => state.user);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="display-container">
      {!gallery ? (
        <DisplayContainer
          weatherData={weatherData}
          emoji={emoji}
          name={currentUser.username}
        />
      ) : (
        <div className="app-container gallery">
          <Gallery itemType={itemType} />
        </div>
      )}

      <div className="app-container">
        <Sidebar onMenuClick={onMenuClick} />
      </div>
    </div>
  );
}
