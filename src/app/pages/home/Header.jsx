import React from 'react';
import PropTypes from 'prop-types';

import styles from './Header.scss';
import User from './header/User';
import Branding from './header/Branding';

function Header({
  username,
  signedIn,
  leftActive,
}) {
  return (
    <header>
      <Branding leftActive={leftActive} />
      <User
        UN={username}
        signedIn={signedIn}
      />
    </header>
  );
}

Header.propTypes = {
  leftActive: PropTypes.bool.isRequired,
  username: PropTypes.string,
  signedIn: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  username: '',
};


export default Header;
