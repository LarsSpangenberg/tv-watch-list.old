import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as handleUser from 'modules/user';

import styles from './User.scss';
import Login from './user/Login';
import SignUp from './user/SignUp';
import SignedInUser from './user/SignedInUser';

const mapStateToProps = state => ({
  un: state.user.username,
  newUser: state.user.newUser,
  signedIn: state.user.signedIn,
  errors: state.user.errors,
});

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
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
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

    let userUi;
    if (signedIn) {
      userUi = (
        <SignedInUser
          username={un}
          buttonClass={styles.buttons}
          errorClass={styles.error}
          logout={logout}
        />
      );
    } else if (newUser) {
      userUi = (
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
    } else {
      userUi = (
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

    return (
      <div className={styles.user}>
        {userUi}
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
