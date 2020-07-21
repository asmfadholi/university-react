import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';

class SearchInput extends React.Component {
  state = {
    input: '',
  }

  onChange = (event, name) => {
    const newValue = event.target.value;
    this.setState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  }

  onSubmit = () => {

  }

  render() {
    const { props } = this;
    return (
      <>
        <Form
          inline
          className="cr-search-form"
          onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit();
          }}
        >
          <MdSearch
            size="20"
            className="cr-search-form__icon-search text-secondary"
          />
          <Input
            type="search"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value, props.placeholder)}
            className="cr-search-form__input"
            placeholder={props.placeholder}
          />
        </Form>
      </>
    );
  }
}

export default SearchInput;
