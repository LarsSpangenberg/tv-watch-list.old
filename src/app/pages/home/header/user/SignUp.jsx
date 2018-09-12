import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './SignUp.scss';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password, signup } = this.props;
    const formData = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    signup(formData);
  }

  render() {
    const {
      username,
      password,
      confirmPassword,
      errors,
      buttonClass,
      errorClass,
      handleChange,
      toggleNewUser,
    } = this.props;

    const errorDisplay = errors ? <p className={errorClass}>{`* ${errors}`}</p> : '';

    return (
      <div className={styles.signUp}>
        <form onSubmit={this.handleSubmit}>
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
            type="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
          />
          <div className={buttonClass}>
            <button type="submit">Submit</button>
            <button type="button" onClick={toggleNewUser}>Already have an Account</button>
          </div>
        </form>
        {errorDisplay}
      </div>
    );
  }
}
SignUp.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  errors: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
  errorClass: PropTypes.string.isRequired,
  signup: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  toggleNewUser: PropTypes.func.isRequired,
};

export default SignUp;
