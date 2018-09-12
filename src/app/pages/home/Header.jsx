import React from 'react';
import PropTypes from 'prop-types';

import styles from './Header.scss';
import User from './header/User';
import Branding from './header/Branding';

function Header({
  leftActive,
}) {
  return (
    <header>
      <Branding leftActive={leftActive} />
      <User />
    </header>
  );
}

Header.propTypes = {
  leftActive: PropTypes.bool.isRequired,
};


export default Header;
