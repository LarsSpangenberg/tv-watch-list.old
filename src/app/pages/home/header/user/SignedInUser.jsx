import React from 'react';
import PropTypes from 'prop-types';

import styles from './SignedInUser.scss';

function SignedInUser({
  username,
  buttonClass,
}) {
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log('sign-up-form, username: ');
  //   console.log(username);
  //   // const xhr = new XMLHttpRequest();
  //   // xhr.open('POST', '/', true);
  // }

  return (
    <div className={styles.signedIn}>
      <i className="fas fa-user-astronaut" />
      <div className={styles.lower}>
        <h2>{username}</h2>
        <div className={buttonClass}>
          <button type="button">Log out</button>
        </div>
      </div>
    </div>
  );
}
SignedInUser.propTypes = {
  username: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
};

export default SignedInUser;
