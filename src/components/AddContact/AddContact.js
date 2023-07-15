import css from './addContact.module.css';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const AddContact = ({ onContactCreate }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleFormChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    onContactCreate(name, number);
    setName('');
    setNumber('');
  };
  const idName = nanoid();
  const idNumber = nanoid();

  return (
    <div className={css.main}>
      <form className={css.form} onSubmit={handleFormSubmit}>
        <label htmlFor={idName}>
          <h1 className={css.main_title}>Name</h1>
          <input
            className={css.name_input}
            type="text"
            name="name"
            value={name}
            onChange={handleFormChange}
            id={idName}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. 
                          For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor={idNumber}>
          <h1 className={css.main_title}>Number</h1>
          <input
            className={css.name_input}
            type="tel"
            name="number"
            value={number}
            onChange={handleFormChange}
            id={idNumber}
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
};

AddContact.propTypes = {
  onContactCreate: PropTypes.func.isRequired,
};

export default AddContact;
