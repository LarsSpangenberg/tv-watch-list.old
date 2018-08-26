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
      login: false,
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
    console.log(e.target.name);
    console.log(e.target.value);
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
        />
      );
    } else if (login) {
      userElement = (
        <Login
          username={username}
          password={password}
          buttonClass={styles.buttons}
          handleChange={this.handleChange}
          toggleLogin={this.toggleLogin}
        />
      );
    } else {
      userElement = (
        <SignUp
          username={username}
          password={password}
          confirmPassword={confirmPassword}
          buttonClass={styles.buttons}
          handleChange={this.handleChange}
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
};

User.defaultProps = {
  user: {},
};

export default User;
