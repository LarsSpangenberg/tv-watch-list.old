import React from 'react';

import styles from './header.css'

const Header = (props) => {
  return (
    <header>
      <div className="branding">
        <h1>Watch List</h1>
        <h2>Never lose track of your TV episodes again!</h2>
      </div>

      <div className="user">
        <i className="fas fa-user"></i>
        <h2>Lazerus</h2>
      </div>
    </header>
  );
};

export default Header;
