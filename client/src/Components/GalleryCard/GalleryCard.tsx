import './GalleryCard.css';

interface GalleryCardProps {
  key: number;
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
