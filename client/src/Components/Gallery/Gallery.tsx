import './Gallery.css';
import GalleryCard from '../GalleryCard/GalleryCard';
import { useEffect, useState } from 'react';
import { getAllItemsFromCat } from '../../Services/apiService';
import { IItemGallery, IGalleryProps } from './Gallery.Types';
import { useSelector } from 'react-redux';

function Gallery( {itemType}: IGalleryProps ) {
const {currentUser } = useSelector((state: any) => state.user);
console.log("from the gallery", currentUser.profilePicture)
  const [itemGallery, setItemGallery] = useState<IItemGallery []>([]);

  useEffect(() => {
    getAllItemsFromCat(itemType).then((res) => {
      setItemGallery(res.map((item : string) => item));
    });
  }, [itemType]);


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
