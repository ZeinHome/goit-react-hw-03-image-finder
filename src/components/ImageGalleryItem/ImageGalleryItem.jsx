import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

function ImageGalleryItem({ imagesArray, onImageClick }) {
  return imagesArray.map(({ previewURL, id, type }, index) => {
    return (
      <GalleryItem key={id} onClick={() => onImageClick(index)}>
        <GalleryItemImage src={previewURL} alt={type} />
      </GalleryItem>
    );
  });
}

export default ImageGalleryItem;
