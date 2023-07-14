import css from './Notification.module.css';

const Notification = () => {
  return (
    <div>
      <h1 className={css.notification}>You don't have any contacts yet!!!</h1>
    </div>
  );
};

export default Notification;
