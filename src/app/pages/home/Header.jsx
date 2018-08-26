import React from 'react';
import PropTypes from 'prop-types';

import styles from './Header.scss';
import User from './header/User';
import Branding from './header/Branding';

function Header({
  user,
  signedIn,
  leftActive,
}) {
  return (
    <header>
      <Branding leftActive={leftActive} />
      <User
        user={user}
        signedIn={signedIn}
      />
    </header>
  );
}

Header.propTypes = {
  leftActive: PropTypes.bool.isRequired,
  user: PropTypes.object, // eslint-disable-line
  signedIn: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  user: {},
};


export default Header;
