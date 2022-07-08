import { Component } from 'react';
import axios from 'axios';
import { ImageGalleryContainer, Container } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';

class ImageGallery extends Component {
  state = {
    imagesArray: [],
    pages: 1,
    isloading: false,
    showModal: false,
    activIndex: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageName !== this.props.imageName) {
      this.setState(prevState => ({ isloading: true }));

      axios
        .get(
          `https://pixabay.com/api/?key=28498963-d14ed543a0b98f000b6c864a2&q=${this.props.imageName}&image_type=photo&page=${this.state.pages}&per_page=12`
        )
        .then(res => {
          return this.setState({ imagesArray: res.data.hits, pages: 1 });
        })
        .finally(this.setState(prevState => ({ isloading: false })));
    }

    if (this.state.pages !== prevState.pages) {
      this.setState(prevState => ({ isloading: true }));

      axios
        .get(
          `https://pixabay.com/api/?key=28498963-d14ed543a0b98f000b6c864a2&q=${this.props.imageName}&image_type=photo&page=${this.state.pages}&per_page=12`
        )
        .then(res => {
          return this.setState(prevState => ({
            imagesArray: [...this.state.imagesArray, ...res.data.hits],
          }));
        })
        .finally(this.setState(prevState => ({ isloading: false })));
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      pages: prevState.pages + 1,
    }));
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  handleImageClick = index => {
    this.toggleModal();
    return this.setState({ activIndex: this.state.imagesArray[index] });
  };

  render() {
    return (
      <Container>
        {this.state.isloading && <Loader />}
        <ImageGalleryContainer>
          <ImageGalleryItem
            imagesArray={this.state.imagesArray}
            onImageClick={this.handleImageClick}
          />
          {this.state.showModal && (
            <Modal onCloseModal={this.toggleModal}>
              <img
                src={this.state.activIndex.largeImageURL}
                alt={this.state.activIndex.tags}
              />
            </Modal>
          )}
        </ImageGalleryContainer>
        {this.state.imagesArray.length !== 0 && (
          <Button onLoadMore={this.loadMore} />
        )}
      </Container>
    );
  }
}

export default ImageGallery;
