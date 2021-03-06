import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    imageName: '',
  };

  handelSubmitForm = image => {
    this.setState({ imageName: image });
  };

  render() {
    return (
      <Box>
        <Searchbar onSubmit={this.handelSubmitForm} />
        <ImageGallery imageName={this.state.imageName} />
        <ToastContainer />
      </Box>
    );
  }
}
