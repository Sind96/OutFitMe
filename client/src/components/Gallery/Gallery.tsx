import "./Gallery.css";
import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {
  deleteClothingItem,
  getAllItemsFromCat,
} from "../../services/clothingItemService";
import type { ClothingItem } from "../../types/clothingItem.types";
import GalleryCard from "../GalleryCard/GalleryCard";
import type { IGalleryProps } from "./Gallery.types";
import { toast } from "react-toastify";

function Gallery({ itemType, refreshKey }: IGalleryProps) {
  const [itemGallery, setItemGallery] = useState<ClothingItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const items = await getAllItemsFromCat(itemType);
        setItemGallery(items);
      } catch (error) {
        console.error("Failed to fetch gallery items", error);
        setItemGallery([]);
        setError("Unable to load gallery items. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryItems();
  }, [itemType, refreshKey]);

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteClothingItem(id);
      setItemGallery((prevItems) =>
        prevItems.filter((item) => item._id !== id),
      );
      toast.success("Clothing item deleted successfully.");
    } catch (error) {
      console.error("Failed to delete clothing item", error);
      toast.error("Failed to delete clothing item.");
    }
  };

  return (
    <div className="gallery">
      <h1 className="gallery-title">{itemType.toUpperCase()}</h1>

      {isLoading && <LoadingSpinner text="Loading gallery..." />}

      {error && (
        <div className="gallery-state gallery-state-error">
          <h2>We couldn&apos;t load your wardrobe.</h2>
          <p>Please try again in a moment.</p>
        </div>
      )}

      {!isLoading && !error && itemGallery.length === 0 && (
        <div className="gallery-state">
          <h2>No {itemType} items uploaded yet.</h2>
          <p>Add some clothing items to start building outfits.</p>
        </div>
      )}

      {!isLoading && !error && itemGallery.length > 0 && (
        <ul className="gallery-items">
          {itemGallery.map((item) => (
            <li key={item._id}>
              <Zoom>
                <GalleryCard
                  source={item.imgURL}
                  onDelete={() => handleDeleteItem(item._id)}
                />
              </Zoom>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Gallery;
