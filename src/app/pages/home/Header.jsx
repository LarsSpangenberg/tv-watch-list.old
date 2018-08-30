import React from 'react';
import PropTypes from 'prop-types';

import styles from './Header.scss';
import User from './header/User';
import Branding from './header/Branding';

function Header({
  user,
  signedIn,
  leftActive,
  handleUser,
}) {
  return (
    <header>
      <Branding leftActive={leftActive} />
      <User
        user={user}
        signedIn={signedIn}
        handleUser={handleUser}
      />
    </header>
  );
}

Header.propTypes = {
  leftActive: PropTypes.bool.isRequired,
  user: PropTypes.object, // eslint-disable-line
  signedIn: PropTypes.bool.isRequired,
  handleUser: PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: {},
};


export default Header;
