import './GalleryCard.css';

interface GalleryCardProps {
  key: string;
  source: string;

}

function GalleryCard({ key, source }: GalleryCardProps) {
  return (
    <div className='grid-container'>
      <img className="gallery-item" src={source} key={key}></img>
    </div>
  );
}

export default GalleryCard;
