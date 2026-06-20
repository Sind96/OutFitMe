import "./Gallery.css";
import GalleryCard from "../GalleryCard/GalleryCard";
import { useEffect, useState } from "react";
import { getAllItemsFromCat } from "../../Services/apiService";
import { IItemGallery, IGalleryProps } from "./Gallery.Types";
import { useAppSelector } from "../../store/hooks/reduxHooks";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function Gallery({ itemType }: IGalleryProps) {
  const { currentUser } = useAppSelector((state) => state.user);

  const [itemGallery, setItemGallery] = useState<IItemGallery[]>([]);

  useEffect(() => {
    getAllItemsFromCat(itemType).then((res) => {
      setItemGallery(res);
    });
  }, [itemType]);

  return (
    <>
      <div className="gallery">
        <h1 className="gallery-title">{itemType.toUpperCase()}</h1>
        <div className="gallery-items">
          {itemGallery.map((item) => (
            <li key={item._id}>
              <Zoom>
                <GalleryCard source={item.imgURL} />
              </Zoom>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}

export default Gallery;
