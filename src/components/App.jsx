import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
// import { Modal } from './Modal/Modal.styled';

export class App extends Component {
  state = {
    imageName: '',
    // showModal: false,
    // activIndex: null,
  };

  handelSubmitForm = image => {
    this.setState({ imageName: image });
  };

  render() {
    return (
      <Box>
        <Searchbar onSubmit={this.handelSubmitForm} />
        <ImageGallery imageName={this.state.imageName} />
        {/* {this.state.showModal && (
          <Modal onCloseModal={this.toggleModal}>
            <img src={activIndex.largeImageURL} alt={activIndex.tags} />
          </Modal>
        )} */}
        <ToastContainer />
      </Box>
    );
  }
}
