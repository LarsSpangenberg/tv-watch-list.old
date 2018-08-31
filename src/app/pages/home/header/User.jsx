import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './User.scss';
import Login from './user/Login';
import SignUp from './user/SignUp';
import SignedInUser from './user/SignedInUser';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      login: true,
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   console.log('sign-up-form, username: ');
  //   console.log(username);
  //   // const xhr = new XMLHttpRequest();
  //   // xhr.open('POST', '/', true);
  // }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  toggleLogin() {
    const { login } = this.state;
    this.setState({
      login: !login,
    });
  }

  render() {
    const {
      signedIn,
      user,
      handleUser,
    } = this.props;
    const {
      username,
      password,
      confirmPassword,
      login,
    } = this.state;
    let userElement;

    if (signedIn) {
      userElement = (
        <SignedInUser
          username={user.username}
          buttonClass={styles.buttons}
          errorClass={styles.error}
          handleUser={handleUser}
        />
      );
    } else if (login) {
      userElement = (
        <Login
          username={username}
          password={password}
          signedIn={signedIn}
          buttonClass={styles.buttons}
          errorClass={styles.error}
          handleChange={this.handleChange}
          handleUser={handleUser}
          toggleLogin={this.toggleLogin}
        />
      );
    } else {
      userElement = (
        <SignUp
          username={username}
          password={password}
          signedIn={signedIn}
          confirmPassword={confirmPassword}
          buttonClass={styles.buttons}
          errorClass={styles.error}
          handleChange={this.handleChange}
          handleUser={handleUser}
          toggleLogin={this.toggleLogin}
        />
      );
    }

    return (
      <div className={styles.user}>
        {userElement}
      </div>
    );
  }
}
User.propTypes = {
  user: PropTypes.object, // eslint-disable-line
  signedIn: PropTypes.bool.isRequired,
  handleUser: PropTypes.func.isRequired,
};

User.defaultProps = {
  user: {},
};

export default User;
