import "./GalleryCard.css";
import type { GalleryCardProps } from "./GalleryCard.types";

function GalleryCard({ source }: GalleryCardProps) {
  return (
    <div className="grid-container">
      <img className="gallery-item" src={source} alt="Clothing item" />
    </div>
  );
}

export default GalleryCard;
