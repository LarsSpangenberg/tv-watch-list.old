import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password, login } = this.props;
    const formData = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    login(formData);
  }

  render() {
    const {
      username,
      password,
      errors,
      buttonClass,
      errorClass,
      handleChange,
      toggleNewUser,
    } = this.props;

    const errorDisplay = errors ? <p className={errorClass}>{`* ${errors}`}</p> : '';

    return (
      <div className={styles.login}>
        <form action="/" onSubmit={this.handleSubmit}>
          <h2>Log In</h2>
          <input
            autoComplete="off"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleChange}
          />
          <input
            autoComplete="off"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <div className={buttonClass}>
            <button type="submit">Submit</button>
            <button type="button" onClick={toggleNewUser}>Create new Account</button>
          </div>
        </form>
        {errorDisplay}
      </div>
    );
  }
}
Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  errors: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
  errorClass: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  toggleNewUser: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default Login;
