import React from 'react';
import PropTypes from 'prop-types';

import styles from './Login.scss';

function Login({
  username,
  password,
  buttonClass,
  handleChange,
}) {
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log('sign-up-form, username: ');
  //   console.log(username);
  //   // const xhr = new XMLHttpRequest();
  //   // xhr.open('POST', '/', true);
  // }

  return (
    <div className={styles.login}>
      <form>
        <h2>Log In</h2>
        <input
          autoComplete="off"
          id="username"
          name="username"
          type="text"
          value={username}
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          autoComplete="off"
          id="password"
          name="password"
          type="text"
          value={password}
          placeholder="Password"
          onChange={handleChange}
        />
        <div className={buttonClass}>
          <button type="submit">Submit</button>
          <button type="button">Create new Account</button>
        </div>
      </form>
    </div>
  );
}
Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Login;
