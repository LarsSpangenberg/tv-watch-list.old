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

    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((user) => {
            handleUser(user, true);
            this.setState({
              errors: {},
            });
          });
        } else {
          res.json().then((errors) => {
            this.setState({
              errors: errors.message,
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

    const errorDisplay = Object.keys(errors).length !== 0 ? <p className={errorClass}>{`* ${errors}`}</p> : '';

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
        {errorDisplay}
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
