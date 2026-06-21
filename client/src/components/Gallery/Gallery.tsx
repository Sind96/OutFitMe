import "./Gallery.css";
import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import { getAllItemsFromCat } from "../../services/clothingItemService";
import type { ClothingItem } from "../../types/clothingItem.types";
import GalleryCard from "../GalleryCard/GalleryCard";
import type { IGalleryProps } from "./Gallery.types";

function Gallery({ itemType }: IGalleryProps) {
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
  }, [itemType]);

  return (
    <div className="gallery">
      <h1 className="gallery-title">{itemType.toUpperCase()}</h1>

      {isLoading && <p>Loading gallery...</p>}

      {error && <p className="gallery-error">{error}</p>}

      {!isLoading && !error && itemGallery.length === 0 && (
        <p>No {itemType} items found.</p>
      )}

      {!isLoading && !error && itemGallery.length > 0 && (
        <ul className="gallery-items">
          {itemGallery.map((item) => (
            <li key={item._id}>
              <Zoom>
                <GalleryCard source={item.imgURL} />
              </Zoom>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Gallery;
