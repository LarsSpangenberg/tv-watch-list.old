import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as handleUser from 'modules/user';

import styles from './User.scss';
import Login from './user/Login';
import SignUp from './user/SignUp';
import SignedInUser from './user/SignedInUser';

const mapStateToProps = (state) => {
  const {
    username,
    errors,
    newUser,
    signedIn,
  } = state.user;
  return {
    un: username,
    newUser,
    signedIn,
    errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  const {
    signup,
    login,
    logout,
    toggleNewUser,
  } = handleUser;
  return {
    signup: formData => dispatch(signup(formData)),
    login: formData => dispatch(login(formData)),
    logout: () => dispatch(logout()),
    toggleNewUser: () => dispatch(toggleNewUser()),
  };
};

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUserUI = this.handleUserUI.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleUserUI() {
    const {
      un,
      errors,
      signedIn,
      newUser,
      signup,
      login,
      logout,
      toggleNewUser,
    } = this.props;
    const {
      username,
      password,
      confirmPassword,
    } = this.state;
    if (signedIn) {
      return (
        <SignedInUser
          username={un}
          buttonClass={styles.buttons}
          errorClass={styles.error}
          logout={logout}
        />
      );
    }
    if (newUser) {
      return (
        <SignUp
          username={username}
          password={password}
          errors={errors}
          confirmPassword={confirmPassword}
          buttonClass={styles.buttons}
          errorClass={styles.error}
          handleChange={this.handleChange}
          toggleNewUser={toggleNewUser}
          signup={signup}
        />
      );
    }
    return (
      <Login
        username={username}
        password={password}
        errors={errors}
        buttonClass={styles.buttons}
        errorClass={styles.error}
        handleChange={this.handleChange}
        toggleNewUser={toggleNewUser}
        login={login}
      />
    );
  }

  render() {
    return (
      <div className={styles.user}>
        {this.handleUserUI()}
      </div>
    );
  }
}

User.propTypes = {
  un: PropTypes.string,
  errors: PropTypes.string,
  newUser: PropTypes.bool.isRequired,
  signedIn: PropTypes.bool.isRequired,
  signup: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  toggleNewUser: PropTypes.func.isRequired,
};

User.defaultProps = {
  un: '',
  errors: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
