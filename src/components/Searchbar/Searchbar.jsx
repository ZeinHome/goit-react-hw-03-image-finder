import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormLabel,
  SearchFormInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    imageName: '',
    pages: 1,
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.imageName !== this.prevState ||
      this.state.pages !== this.prevState
    ) {
      console.log(12);
    }
  }

  handelImageChange = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handelSubmit = e => {
    e.preventDefault();

    if (this.state.imageName.trim() === '') {
      toast.error('Введите текст!');
      return;
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '', pages: 1 });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handelSubmit}>
          <SearchFormBtn type="submit">
            <SearchFormLabel>Search</SearchFormLabel>
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            autocomplete="off"
            placeholder="Search images and photos"
            value={this.state.imageName}
            onChange={this.handelImageChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

export default Searchbar;
