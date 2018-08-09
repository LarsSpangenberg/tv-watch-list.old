import React from 'react';

import styles from './Header.css';
import User from './header/User';
import Branding from './header/Branding';

const Header = props => (
  <header>
    <Branding />
    <User />
  </header>
);

export default Header;
