import './GalleryCard.css';

interface GalleryCardProps {
  key: string;
  source: string;

}

function GalleryCard({ key, source }: GalleryCardProps) {
  return (
    <>
      <img className="gallery-item" src={source} key={key}></img>
    </>
  );
}

export default GalleryCard;
