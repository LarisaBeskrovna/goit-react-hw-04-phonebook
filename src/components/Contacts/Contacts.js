import css from './contacts.module.css';
import PropTypes from 'prop-types';
import Notification from '../Notification/Notification';

const Contacts = ({ contacts, onDeleteContact }) => {
  if (contacts.length > 0) {
    return (
      <div className={css.main}>
        <ul className={css.list}>
          {contacts.map(contact => (
            <li className={css.list_item} key={contact.id}>
              {contact.name}: {contact.number}
              <button
                className={css.delete_btn}
                onClick={() => onDeleteContact(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <Notification />;
  }
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onDeleteContact: PropTypes.func,
};
export default Contacts;
