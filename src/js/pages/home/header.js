import React from 'react';

import styles from './header.css';
import User from './header/user.js';
import Branding from './header/branding.js'

const Header = (props) => {
  return (
    <header>
      <Branding />
      <User />
    </header>
  );
};

export default Header;
