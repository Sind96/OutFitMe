import "./GalleryCard.css";
import type { GalleryCardProps } from "./GalleryCard.types";

function GalleryCard({ source, onDelete }: GalleryCardProps) {
  return (
    <div className="grid-container">
      <button
        className="delete-item-button"
        type="button"
        onClick={onDelete}
        aria-label="Delete clothing item"
      >
        ×
      </button>
      <img className="gallery-item" src={source} alt="Clothing item" />
    </div>
  );
}

export default GalleryCard;
