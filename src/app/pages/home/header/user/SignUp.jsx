import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './SignUp.scss';

class SignUp extends Component {
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
    xhr.open('POST', '/api/auth/signup', true);
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
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        console.log(errors);
        this.setState({
          errors,
        });
      }
    });
    xhr.send(formData);
  }

  render() {
    const {
      buttonClass,
      username,
      password,
      confirmPassword,
      handleChange,
      toggleLogin,
    } = this.props;

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
            <button type="button" onClick={toggleLogin}>Already have an Account</button>
          </div>
        </form>
      </div>
    );
  }
}
SignUp.propTypes = {
  buttonClass: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  handleUser: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
};

export default SignUp;
