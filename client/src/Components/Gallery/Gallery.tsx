import './Gallery.css';
import GalleryCard from '../GalleryCard/GalleryCard';
import { useEffect, useState } from 'react';
import { getAllItemsFromCat } from '../../Services/apiService';

interface ItemGallery {
  _id: string,
  imgURL: string,
}

interface GalleryProps {
  itemType: string,
}

function Gallery( {itemType}: GalleryProps ) {

  const [itemGallery, setItemGallery] = useState<ItemGallery []>([]);

  useEffect(() => {
    getAllItemsFromCat(itemType).then((res) => {
      setItemGallery(res.map((item : string) => item));
    });
  }, [itemType]);

  console.log("thisisitemgallery", itemGallery);

  return (
    <>
      <div className="gallery">
        <h1 className="gallery-title">{itemType.toUpperCase()}</h1>
        <div className="gallery-items">
          {itemGallery.map((item) => (
            <GalleryCard key={item._id} source={item.imgURL} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Gallery;
