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
      login: true,
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    const {
      signedIn,
      UN,
    } = this.props;
    const {
      username,
      password,
      login,
    } = this.state;
    let userElement;

    if (signedIn) {
      userElement = (
        <SignedInUser
          username={UN}
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
        />
      );
    } else {
      userElement = (
        <SignUp
          username={username}
          password={password}
          buttonClass={styles.buttons}
          handleChange={this.handleChange}
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
  UN: PropTypes.string,
  signedIn: PropTypes.bool.isRequired,
};

User.defaultProps = {
  UN: '',
};

export default User;
