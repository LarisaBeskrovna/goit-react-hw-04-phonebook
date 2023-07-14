import css from './addContact.module.css';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

class AddContact extends Component {
  state = {
    name: '',
    number: '',
  };

  handleFormChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.onContactCreate(name, number);
    this.setState({ name: '', number: '' });
  };
  idName = nanoid();
  idNumber = nanoid();

  render() {
    return (
      <div className={css.main}>
        <form className={css.form} onSubmit={this.handleFormSubmit}>
          <label htmlFor={this.idName}>
            <h1 className={css.main_title}>Name</h1>
            <input
              className={css.name_input}
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleFormChange}
              id={this.idName}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. 
                          For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label htmlFor={this.idNumber}>
            <h1 className={css.main_title}>Number</h1>
            <input
              className={css.name_input}
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.handleFormChange}
              id={this.idNumber}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit" className={css.add_btn}>
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

AddContact.propTypes = {
  onContactCreate: PropTypes.func.isRequired,
};

export default AddContact;
