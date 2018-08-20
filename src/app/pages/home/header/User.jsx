import React from 'react';
import PropTypes from 'prop-types';

import styles from './User.scss';

function User({ userName }) {
  return (
    <div className={styles.user}>
      <i className="fas fa-user" />
      <h2>{userName}</h2>
    </div>
  );
}
User.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default User;
