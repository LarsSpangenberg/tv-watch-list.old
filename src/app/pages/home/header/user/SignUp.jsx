import React from 'react';
import PropTypes from 'prop-types';

import styles from './SignUp.scss';

function SignUp({
  buttonClass,
  username,
  password,
  confirmPassword,
  handleChange,
  toggleLogin,
}) {
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
        <input
          autoComplete="off"
          id="confirmPassword"
          name="confirmPassword"
          type="text"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        <div className={buttonClass}>
          <button type="submit">Submit</button>
          <button type="button" onClick={toggleLogin}>Already have an Account</button>
        </div>
      </form>
    </div>
  );
}
SignUp.propTypes = {
  buttonClass: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
};

export default SignUp;
