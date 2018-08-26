import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let { username, password } = this.props;
    username = encodeURIComponent(username);
    password = encodeURIComponent(password);
    const formData = `username=${username}&password=${password}`;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/auth/login', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          errors: {},
        });
      } else {
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors,
        });
      }
    });
    xhr.send(formData);
  }

  render() {
    const { errors } = this.state;
    const {
      username,
      password,
      buttonClass,
      handleChange,
      toggleLogin,
    } = this.props;
    return (
      <div className={styles.login}>
        <form action="/" onSubmit={this.handleSubmit}>
          <h2>Log In</h2>
          {errors.summary ? <p className={styles.errorMessage}>{errors.summary}</p> : ''}
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
            <button type="button" onClick={toggleLogin}>Create new Account</button>
          </div>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
};

export default Login;
