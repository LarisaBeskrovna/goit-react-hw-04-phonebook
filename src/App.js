import React, { useState, useEffect } from 'react';
import AddContact from './components/AddContact/AddContact';
import Contacts from './components/Contacts/Contacts';
import Filter from 'components/Filter/Filter';
import './app.css';
import css from './components/Contacts/contacts.module.css';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setState] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savecontact = localStorage.getItem('contact');
    if (savecontact) {
      setState(JSON.parse(savecontact));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);

  const filterChange = e => {
    setFilter(e.target.value);
  };

  const onContactCreate = (name, number) => {
    const duplicateName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicateName) {
      alert('this name is in the contact list!!');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    //setState([...contacts, newContact]);
    setState(prevContacts => [newContact, ...prevContacts]);
  };

  const onDeleteContact = contactId => {
    setState(contacts.filter(contact => contact.id !== contactId));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App">
      <AddContact onContactCreate={onContactCreate} />
      <h1 className={css.title}>Find contacts by name</h1>
      <Filter state={filter} filterChange={filterChange} />
      <h1 className="main_title">Contacts</h1>
      <Contacts contacts={filteredContacts} onDeleteContact={onDeleteContact} />
    </div>
  );
};

export default App;
