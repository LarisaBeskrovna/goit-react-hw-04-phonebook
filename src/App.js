import { Component } from 'react';
import AddContact from './components/AddContact/AddContact';
import Contacts from './components/Contacts/Contacts';
import Filter from 'components/Filter/Filter';
import './app.css';
import css from './components/Contacts/contacts.module.css';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savecontact = localStorage.getItem('contact');
    if (savecontact) {
      this.setState({ savecontacts: JSON.parse(savecontact) });
    }
  }

  componentDidUpdate(presProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    }
  }

  filterChange = e => {
    this.setState({ filter: e.target.value });
  };

  onContactCreate = (name, number) => {
    const duplicateName = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicateName) {
      alert('this name is in the contact list!!');
      return;
    }

    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { id: nanoid(), name: name, number: number },
      ],
    }));
  };

  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  onGetFilterData = () =>
    this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  render() {
    const filteredContacts = this.onGetFilterData();
    return (
      <div className="App">
        <AddContact onContactCreate={this.onContactCreate} />
        <h1 className={css.title}>Find contacts by name</h1>
        <Filter state={this.state} filterChange={this.filterChange} />
        <h1 class="main_title">Contacts</h1>
        <Contacts
          contacts={filteredContacts}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;
