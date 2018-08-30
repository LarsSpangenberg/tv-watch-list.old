import React from 'react';
import PropTypes from 'prop-types';

import styles from './SignedInUser.scss';

function SignedInUser({
  username,
  buttonClass,
  handleUser,
}) {
  const handleLogout = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/auth/logout', true);
    xhr.send();
    handleUser(null, false);
  };

  return (
    <div className={styles.signedIn}>
      <i className="fas fa-user-astronaut" />
      <div className={styles.lower}>
        <h2>{username}</h2>
        <div className={buttonClass}>
          <button type="button" onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </div>
  );
}
SignedInUser.propTypes = {
  username: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
  handleUser: PropTypes.func.isRequired,
};

export default SignedInUser;
