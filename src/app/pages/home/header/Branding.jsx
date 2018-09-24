/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';

import logo from 'assets/logo.svg';
import styles from './Branding.scss';

function Branding({ leftActive }) {
  return (
    <div className={styles.branding}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Watchlist logo" className={styles.logo} />
      </div>
      <div className={`${styles.headerText} ${leftActive ? styles.leftActive : ''}`}>
        <h1>Telly Time</h1>
        <h2>your personal Watchlist</h2>
      </div>
    </div>
  );
}
Branding.propTypes = {
  leftActive: PropTypes.bool.isRequired,
};

export default Branding;
