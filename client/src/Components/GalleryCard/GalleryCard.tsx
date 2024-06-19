import './GalleryCard.css';

interface GalleryCardProps {

  source: string;

}

function GalleryCard({ source }: GalleryCardProps) {
  return (
    <div className='grid-container'>
      <img className="gallery-item" src={source} ></img>
    </div>
  );
}

export default GalleryCard;
