import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

function ImageGalleryItem({ imagesArray }) {
  return imagesArray.map(({ previewURL, id, type }) => {
    return (
      <GalleryItem key={id}>
        <GalleryItemImage src={previewURL} alt={type} />
      </GalleryItem>
    );
  });
}

export default ImageGalleryItem;
