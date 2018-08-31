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
    const { username, password, handleUser } = this.props;
    const formData = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/auth/login', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log(xhr.response);
        handleUser(xhr.response, true);
        this.setState({
          errors: {},
        });
      } else {
        console.log(xhr.response);
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
      errorClass,
      handleChange,
      toggleLogin,
    } = this.props;
    return (
      <div className={styles.login}>
        <form action="/" onSubmit={this.handleSubmit}>
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
            type="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
          />
          <div className={buttonClass}>
            <button type="submit">Submit</button>
            <button type="button" onClick={toggleLogin}>Create new Account</button>
          </div>
        </form>
        {errors.summary ? <p className={errorClass}>{`* ${errors.summary}`}</p> : ''}
      </div>
    );
  }
}
Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
  errorClass: PropTypes.string.isRequired,
  handleUser: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
};

export default Login;
