import { Component } from 'react';
import axios from 'axios';
import { ImageGalleryContainer } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    imagesArray: [],
  };
  // &q=yellow+flowers

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageName !== this.props.imageName) {
      axios
        .get(
          `https://pixabay.com/api/?key=28498963-d14ed543a0b98f000b6c864a2&q=${this.props.imageName}&image_type=photo&per_page=12`
        )
        .then(res => {
          return this.setState({ imagesArray: res.data.hits });
        });
    }
  }
  render() {
    console.log(this.state.imagesArray);
    return (
      <div>
        <ImageGalleryContainer>
          <ImageGalleryItem imagesArray={this.state.imagesArray} />
        </ImageGalleryContainer>
      </div>
    );
  }
}

export default ImageGallery;
