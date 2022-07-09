import { Component } from 'react';
import { ImageGalleryContainer, Container } from './ImageGallery.styled';
import ImageGalleryItems from '../ImageGalleryItems/ImageGalleryItems ';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import fetchImages from '../Services/Services';

class ImageGallery extends Component {
  state = {
    imagesArray: [],
    pages: 1,
    isloading: false,
    showModal: false,
    largeImageURL: null,
    tags: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageName !== this.props.imageName) {
      this.setState(prevState => ({ isloading: true }));
      const ImagesDate = fetchImages(this.props.imageName, this.state.pages);

      ImagesDate.then(res => {
        return this.setState({ imagesArray: res.hits, pages: 1 });
      }).finally(this.setState(prevState => ({ isloading: false })));
    }

    if (this.state.pages !== prevState.pages) {
      this.setState(prevState => ({ isloading: true }));

      const ImagesDate = fetchImages(this.props.imageName, this.state.pages);

      ImagesDate.then(res => {
        return this.setState(prevState => ({
          imagesArray: [...this.state.imagesArray, ...res.hits],
        }));
      }).finally(this.setState(prevState => ({ isloading: false })));
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

  handleImageClick = ({ largeImageURL, tags }) => {
    this.toggleModal();

    return this.setState({ largeImageURL: largeImageURL, tags: tags });
  };

  render() {
    return (
      <Container>
        {this.state.isloading && <Loader />}
        <ImageGalleryContainer>
          <ImageGalleryItems
            imagesArray={this.state.imagesArray}
            onImageClick={this.handleImageClick}
          />
          {this.state.showModal && (
            <Modal onCloseModal={this.toggleModal}>
              <img src={this.state.largeImageURL} alt={this.state.tags} />
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
