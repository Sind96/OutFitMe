import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Favourites.css";
import type { NavbarProps } from "../../components/Navbar/Navbar.types";
import Navbar from "../../components/Navbar/Navbar";
import {
  getFavouriteOutfits,
  removeFavouriteOutfit,
} from "../../services/authService";
import { useAppSelector } from "../../store/hooks/reduxHooks";
import type { FavouriteOutfit } from "../../types/auth.types";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function Favourites({ onMenuClick }: NavbarProps) {
  const { currentUser } = useAppSelector((state) => state.user);
  const [favouriteOutfits, setFavouriteOutfits] = useState<FavouriteOutfit[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFavouriteOutfits = async () => {
      if (!currentUser?._id) return;

      try {
        setIsLoading(true);
        const outfits = await getFavouriteOutfits(currentUser._id);
        setFavouriteOutfits(outfits);
      } catch (error) {
        console.error("Failed to fetch favourite outfits", error);
        toast.error("Failed to load favourite outfits.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavouriteOutfits();
  }, [currentUser?._id]);

  const handleRemoveFavourite = async (favouriteId: string) => {
    if (!currentUser?._id) return;

    try {
      const response = await removeFavouriteOutfit(
        currentUser._id,
        favouriteId,
      );
      setFavouriteOutfits(response.favouriteOutfits);
      toast.success("Favourite outfit removed.");
    } catch (error) {
      console.error("Failed to remove favourite outfit", error);
      toast.error("Failed to remove favourite outfit.");
    }
  };

  return (
    <main className="favourites-page">
      <h1 className="favourites-title">Favourite Outfits</h1>
      {isLoading && <LoadingSpinner text="Loading favourite outfits..." />}
      {!isLoading && favouriteOutfits.length === 0 && (
        <div className="gallery-state">
          <h2>No favourite outfits saved yet.</h2>
          <p>Generate an outfit and save it to see it here.</p>
        </div>
      )}
      {!isLoading && favouriteOutfits.length > 0 && (
        <ul className="favourites-grid">
          {favouriteOutfits.map((outfit) => (
            <li key={outfit._id} className="favourite-card">
              <img src={outfit.top} alt="Favourite outfit top" />
              <img src={outfit.bottom} alt="Favourite outfit bottom" />
              <img src={outfit.shoe} alt="Favourite outfit shoe" />
              <button
                type="button"
                className="remove-favourite-button"
                onClick={() => handleRemoveFavourite(outfit._id)}
              >
                🗑 Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <Navbar onMenuClick={onMenuClick} />
    </main>
  );
}
