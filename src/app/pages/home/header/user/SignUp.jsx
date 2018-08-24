import React from 'react';
import PropTypes from 'prop-types';

import styles from './SignUp.scss';

function SignUp({ username, password, handleChange }) {
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log('sign-up-form, username: ');
  //   console.log(username);
  //   // const xhr = new XMLHttpRequest();
  //   // xhr.open('POST', '/', true);
  // }

  return (
    <div className={styles.signUp}>
      <form>
        <h2>Sign up</h2>
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
      </form>
      <button type="submit">Submit</button>
      <button type="button">Already have an Account</button>
    </div>
  );
}
SignUp.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SignUp;
