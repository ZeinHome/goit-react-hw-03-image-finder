import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

function ImageGalleryItem({ imagesArray }) {
  console.log(imagesArray);
  return imagesArray.map(({ previewURL, id, type }) => {
    console.log(previewURL);
    return (
      <GalleryItem key={id}>
        <GalleryItemImage src={previewURL} alt={type} />
      </GalleryItem>
    );
  });
}

export default ImageGalleryItem;
