import React from 'react';

import styles from './User.scss';

function User(props) {
  return (
    <div className={styles.user}>
      <i className="fas fa-user" />
      <h2>LarzenDork</h2>
    </div>
  );
}

export default User;
