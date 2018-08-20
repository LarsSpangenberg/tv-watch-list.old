import React from 'react';
import PropTypes from 'prop-types';

import styles from './Header.scss';
import User from './header/User';
import Branding from './header/Branding';

function Header({ leftActive, userName }) {
  return (
    <header>
      <Branding leftActive={leftActive} />
      <User userName={userName} />
    </header>
  );
}

Header.propTypes = {
  leftActive: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Header;
